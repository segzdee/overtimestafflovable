
import { checkSupabaseConnection } from "./supabase/client";

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  criticalOperation?: boolean;
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  criticalOperation: false
};

let isInitialized = false;
let navigator = {} as Navigator;
let connectionMonitorInterval: number | null = null;
let onlineStatus = true;
let offlineCallbacks: (() => void)[] = [];
let onlineCallbacks: (() => void)[] = [];

export function initConnectionHandling(): void {
  if (isInitialized || typeof window === 'undefined') return;
  
  navigator = window.navigator;
  onlineStatus = navigator.onLine;
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Initial connection check
  checkConnection().then(isConnected => {
    onlineStatus = isConnected;
    console.log(`Initial connection status: ${isConnected ? 'online' : 'offline'}`);
  });
  
  // Set up periodic connection checking
  connectionMonitorInterval = window.setInterval(() => {
    checkConnection().then(isConnected => {
      // Only update and trigger callbacks if status changed
      if (isConnected !== onlineStatus) {
        onlineStatus = isConnected;
        if (isConnected) {
          handleOnline();
        } else {
          handleOffline();
        }
      }
    });
  }, 30000); // Check every 30 seconds
  
  isInitialized = true;
}

export function cleanupConnectionHandling(): void {
  if (!isInitialized) return;
  
  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
  
  if (connectionMonitorInterval !== null) {
    clearInterval(connectionMonitorInterval);
    connectionMonitorInterval = null;
  }
  
  isInitialized = false;
}

function handleOnline(): void {
  console.log('Connection restored');
  onlineStatus = true;
  onlineCallbacks.forEach(callback => {
    try {
      callback();
    } catch (error) {
      console.error('Error in online callback:', error);
    }
  });
}

function handleOffline(): void {
  console.log('Connection lost');
  onlineStatus = false;
  offlineCallbacks.forEach(callback => {
    try {
      callback();
    } catch (error) {
      console.error('Error in offline callback:', error);
    }
  });
}

export function addOfflineCallback(callback: () => void): void {
  offlineCallbacks.push(callback);
}

export function addOnlineCallback(callback: () => void): void {
  onlineCallbacks.push(callback);
}

export function removeOfflineCallback(callback: () => void): void {
  offlineCallbacks = offlineCallbacks.filter(cb => cb !== callback);
}

export function removeOnlineCallback(callback: () => void): void {
  onlineCallbacks = onlineCallbacks.filter(cb => cb !== callback);
}

export async function checkConnection(): Promise<boolean> {
  // First check navigator.onLine as a fast path
  if (!navigator.onLine) {
    return false;
  }
  
  // Then do a more reliable check with Supabase
  try {
    return await checkSupabaseConnection();
  } catch (error) {
    console.error('Error checking connection:', error);
    return false;
  }
}

export function isOnline(): boolean {
  return onlineStatus;
}

export async function executeWithConnectionRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  let retries = 0;
  
  while (true) {
    try {
      return await operation();
    } catch (error: any) {
      // Check if it's a network-related error
      const isNetworkError = error.message?.includes('network') || 
                             error.message?.includes('connection') ||
                             error.message?.includes('offline') ||
                             error.code === 'NETWORK_ERROR' ||
                             error.code === 'CONNECTION_ERROR';
                            
      // If it's the last retry or not a network issue and it's a critical operation, throw
      if (retries >= mergedOptions.maxRetries! || 
          (!isNetworkError && mergedOptions.criticalOperation)) {
        throw error;
      }
      
      // If not online and it's a critical operation, throw special error
      if (!isOnline() && mergedOptions.criticalOperation) {
        throw new Error('Operation cannot be completed while offline');
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(
        mergedOptions.baseDelay! * Math.pow(2, retries),
        mergedOptions.maxDelay!
      );
      
      console.log(`Retry ${retries + 1}/${mergedOptions.maxRetries} after ${delay}ms. Error: ${error.message}`);
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delay));
      retries++;
    }
  }
}
