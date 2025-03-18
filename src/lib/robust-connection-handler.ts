
/**
 * Connection resilience utilities for handling network errors and retry logic
 */

// Track connection state
let isConnected = navigator.onLine;
const connectionListeners: Array<(connected: boolean) => void> = [];

// Function to check if we're connected to the internet
export async function checkConnection(): Promise<boolean> {
  if (!navigator.onLine) return false;

  try {
    // Try to fetch a small resource to check actual connectivity
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('/favicon.ico', { 
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-store'
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (e) {
    return false;
  }
}

// Function to execute an operation with retry logic
export async function executeWithConnectionRetry<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    retryDelay?: number;
    criticalOperation?: boolean;
    onRetry?: (attempt: number) => void;
  } = {}
): Promise<T> {
  const maxRetries = options.maxRetries || 3;
  const retryDelay = options.retryDelay || 1000;
  const isCritical = options.criticalOperation || false;
  
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const connected = await checkConnection();
      
      if (!connected) {
        console.warn('No internet connection detected');
        
        if (isCritical) {
          throw new Error('No internet connection. Please check your connection and try again.');
        } else {
          console.warn('Skipping non-critical operation due to connection issues');
          throw new Error('Operation skipped: No internet connection');
        }
      }
      
      // Execute the operation
      return await operation();
      
    } catch (error) {
      attempt++;
      
      // Check if the error is connection related
      const isConnectionError = isNetworkError(error);
      
      if (isConnectionError && attempt <= maxRetries) {
        // Log and notify about retry
        console.warn(`Connection error, retrying (${attempt}/${maxRetries})...`, error);
        
        if (options.onRetry) {
          options.onRetry(attempt);
        }
        
        // Wait before next retry with exponential backoff
        const backoffDelay = retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        continue;
      }
      
      // If we've reached max retries or it's not a connection error, throw
      throw error;
    }
  }
  
  throw new Error(`Operation failed after ${maxRetries} attempts`);
}

// Function to determine if an error is network related
function isNetworkError(error: any): boolean {
  if (!error) return false;
  
  const errorMessage = error.message || String(error);
  const networkErrorKeywords = [
    'network',
    'internet',
    'offline',
    'connection',
    'unreachable',
    'timeout',
    'failed to fetch',
    'cors',
    'aborted'
  ];
  
  return networkErrorKeywords.some(keyword => 
    errorMessage.toLowerCase().includes(keyword)
  );
}

// Initialize connection monitoring
export function initConnectionHandling() {
  // Setup online/offline listeners
  window.addEventListener('online', () => {
    console.log('Browser reports online status');
    updateConnectionState(true);
  });
  
  window.addEventListener('offline', () => {
    console.log('Browser reports offline status');
    updateConnectionState(false);
  });
  
  // Periodically check actual connection (browser online event is not always reliable)
  setInterval(async () => {
    const connected = await checkConnection();
    updateConnectionState(connected);
  }, 30000); // Check every 30 seconds
  
  // Initial connection check
  checkConnection().then(connected => {
    updateConnectionState(connected);
  });
}

// Update the connection state and notify listeners
function updateConnectionState(connected: boolean) {
  if (connected !== isConnected) {
    isConnected = connected;
    console.log(`Connection state changed: ${connected ? 'online' : 'offline'}`);
    
    // Notify all listeners
    connectionListeners.forEach(listener => listener(connected));
  }
}

// Subscribe to connection state changes
export function subscribeToConnectionChanges(
  callback: (connected: boolean) => void
): () => void {
  connectionListeners.push(callback);
  
  // Return unsubscribe function
  return () => {
    const index = connectionListeners.indexOf(callback);
    if (index !== -1) {
      connectionListeners.splice(index, 1);
    }
  };
}

// Store data for later submission when offline
export function storeForLaterSubmission(key: string, data: any): void {
  try {
    const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '{}');
    offlineQueue[key] = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
  } catch (e) {
    console.error('Failed to store data for later submission:', e);
  }
}

// Retrieve offline data
export function getOfflineData(key: string): any {
  try {
    const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '{}');
    return offlineQueue[key]?.data || null;
  } catch (e) {
    console.error('Failed to retrieve offline data:', e);
    return null;
  }
}

// Check if there are any pending operations
export function hasPendingOperations(): boolean {
  try {
    const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '{}');
    return Object.keys(offlineQueue).length > 0;
  } catch (e) {
    return false;
  }
}

// Clear a specific pending operation
export function clearPendingOperation(key: string): void {
  try {
    const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '{}');
    if (offlineQueue[key]) {
      delete offlineQueue[key];
      localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
    }
  } catch (e) {
    console.error('Failed to clear pending operation:', e);
  }
}
