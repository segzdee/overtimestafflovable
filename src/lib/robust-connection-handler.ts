
import { supabase } from "./supabase/client";
import { runSupabaseDiagnostics } from "./debug/supabaseDebugger";

// Constants for connection handling
const CONNECTION_CHECK_INTERVAL = 5000; // Check every 5 seconds
const MAX_RECONNECT_ATTEMPTS = 5; // Maximum number of reconnection attempts
const INITIAL_BACKOFF = 1000; // Initial backoff in milliseconds
const MAX_BACKOFF = 30000; // Maximum backoff in milliseconds

// Track connection state
let isOnline = navigator.onLine;
let reconnectAttempts = 0;
let checkConnectionInterval: number | null = null;
let pendingOperations: Array<{
  operation: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

// Check if we're in production/live environment
const isProduction = window.location.hostname === 'www.overtimestaff.com' || 
                    window.location.hostname === 'overtimestaff.com';

// Set up event listeners for online/offline status
export const setupConnectionListeners = () => {
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Start the connection check interval
  if (checkConnectionInterval === null) {
    checkConnectionInterval = window.setInterval(checkConnection, CONNECTION_CHECK_INTERVAL);
  }
  
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
    if (checkConnectionInterval !== null) {
      window.clearInterval(checkConnectionInterval);
      checkConnectionInterval = null;
    }
  };
};

// Handle going online
const handleOnline = () => {
  console.log('Browser reports online status');
  isOnline = true;
  reconnectAttempts = 0;
  
  // Verify actual connection to Supabase
  checkConnection().then(connected => {
    if (connected) {
      processPendingOperations();
    }
  });
};

// Handle going offline
const handleOffline = () => {
  console.log('Browser reports offline status');
  isOnline = false;
};

// Check actual connection to Supabase
export const checkConnection = async (): Promise<boolean> => {
  if (!isOnline) return false;
  
  try {
    // Use a simple and fast Supabase operation to check connection
    const { data, error } = await supabase.auth.getSession();
    const connected = !error && data;
    
    if (connected) {
      reconnectAttempts = 0;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.warn('Connection check failed:', error);
    return false;
  }
};

// Process operations that were queued while offline
const processPendingOperations = async () => {
  console.log(`Processing ${pendingOperations.length} pending operations`);
  
  const operations = [...pendingOperations];
  pendingOperations = [];
  
  for (const { operation, resolve, reject } of operations) {
    try {
      const result = await operation();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  }
};

// Run a full diagnostic if connection issues are detected
export const runConnectionDiagnostics = async (): Promise<any> => {
  if (isProduction) {
    // In production, just log to console but don't run extensive diagnostics
    console.log("Connection issues detected, but diagnostics are disabled in production");
    return null;
  }
  
  console.log("Running Supabase connection diagnostics...");
  
  try {
    // Get configuration from env vars
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qdyyfxgonldvghrtjhnn.supabase.co';
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXlmeGdvbmxkdmdocnRqaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDAzMTMsImV4cCI6MjA1NTk3NjMxM30.eS660marbWwss7pQFbMUBJ_e2mhH7JBJvaP7Kr3ZU0M';
    
    const results = await runSupabaseDiagnostics(
      supabaseUrl,
      supabaseAnonKey,
      {
        logLevel: 'verbose',
        networkTestCount: 3
      }
    );
    
    return results;
  } catch (error) {
    console.error("Error running diagnostics:", error);
    return null;
  }
};

// Queue an operation for when connection is restored or execute it immediately if online
export const executeWithConnectionRetry = async <T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialBackoff?: number;
    maxBackoff?: number;
    criticalOperation?: boolean;
  } = {}
): Promise<T> => {
  const {
    maxRetries = MAX_RECONNECT_ATTEMPTS,
    initialBackoff = INITIAL_BACKOFF,
    maxBackoff = MAX_BACKOFF,
    criticalOperation = false
  } = options;
  
  // If we're online, try the operation immediately
  if (isOnline) {
    try {
      return await operation();
    } catch (error: any) {
      // Check if the error is connection-related
      if (
        error.message?.includes('network') ||
        error.message?.includes('timeout') ||
        error.message?.includes('connection') ||
        error.message?.includes('offline') ||
        // Specific Supabase error patterns
        error.message?.includes('fetch failed') ||
        error.message?.includes('failed to fetch')
      ) {
        // Connection issue detected, handle with retries
        isOnline = false;
        
        // In development, run diagnostics on connection errors
        if (!isProduction) {
          runConnectionDiagnostics();
        }
      } else {
        // Not a connection error, rethrow
        throw error;
      }
    }
  }
  
  // If we've reached here, we're either offline or encountered a connection error
  if (criticalOperation) {
    // For critical operations like user registration, use exponential backoff
    let currentBackoff = initialBackoff;
    let attempts = 0;
    
    while (attempts < maxRetries) {
      try {
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, currentBackoff));
        
        // Check connection first
        const connected = await checkConnection();
        if (!connected) {
          throw new Error('Still offline');
        }
        
        // Try operation
        return await operation();
      } catch (error) {
        attempts++;
        
        // Increase backoff for next attempt (exponential backoff with jitter)
        currentBackoff = Math.min(
          maxBackoff,
          currentBackoff * 2 * (0.9 + Math.random() * 0.2) // Add 10% jitter
        );
        
        if (attempts >= maxRetries) {
          throw new Error(
            'Operation failed after multiple retries. Please check your internet connection and try again.'
          );
        }
      }
    }
    
    // This should never be reached due to the throw above, but TypeScript needs it
    throw new Error('Unexpected error in retry logic');
  } else {
    // For non-critical operations, queue them for when connection is restored
    return new Promise((resolve, reject) => {
      pendingOperations.push({ operation, resolve, reject });
      console.log(`Operation queued for when connection is restored. Queue size: ${pendingOperations.length}`);
    });
  }
};

// Add this to your main app component's useEffect
export const initConnectionHandling = () => {
  return setupConnectionListeners();
};
