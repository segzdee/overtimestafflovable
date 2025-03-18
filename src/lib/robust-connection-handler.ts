
/**
 * Provides robust connection handling functionality for the application
 * This helps detect network issues and manage offline/online states
 */

// Store connection state
let isOnline = navigator.onLine;
const listeners: Array<(online: boolean) => void> = [];

/**
 * Initialize connection handling by setting up event listeners
 * for online and offline events
 */
export function initConnectionHandling() {
  // Set up event listeners for connection changes
  window.addEventListener('online', handleConnectionChange);
  window.addEventListener('offline', handleConnectionChange);
  
  // Initial connection status
  isOnline = navigator.onLine;
  console.log(`Initial connection status: ${isOnline ? 'Online' : 'Offline'}`);
  
  return () => {
    // Cleanup function
    window.removeEventListener('online', handleConnectionChange);
    window.removeEventListener('offline', handleConnectionChange);
  };
}

/**
 * Handle connection change events (online/offline)
 */
function handleConnectionChange() {
  const wasOnline = isOnline;
  isOnline = navigator.onLine;
  
  // Only notify if the state actually changed
  if (wasOnline !== isOnline) {
    console.log(`Connection status changed: ${isOnline ? 'Online' : 'Offline'}`);
    // Notify all listeners
    listeners.forEach(listener => listener(isOnline));
  }
}

/**
 * Subscribe to connection status changes
 * @param listener Function to call when connection status changes
 * @returns Function to unsubscribe
 */
export function subscribeToConnectionChanges(listener: (online: boolean) => void) {
  listeners.push(listener);
  
  // Immediately call with current status
  listener(isOnline);
  
  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
}

/**
 * Check if the application is currently connected to the internet
 * @param testUrl Optional URL to ping to verify connection
 * @returns Promise that resolves to a boolean indicating connection status
 */
export async function checkConnection(testUrl?: string): Promise<boolean> {
  // First check the navigator.onLine property
  if (!navigator.onLine) {
    return false;
  }
  
  // If a test URL is provided, try to fetch it to confirm connection
  if (testUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch(testUrl, { 
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      console.warn('Connection test failed:', error);
      return false;
    }
  }
  
  // If no test URL, just rely on navigator.onLine
  return isOnline;
}

/**
 * Execute a function with automatic retry on connection failure
 * @param operation Function to execute 
 * @param options Configuration options
 * @returns Promise with the operation result
 */
export async function executeWithConnectionRetry<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    retryDelay?: number;
    criticalOperation?: boolean;
  } = {}
): Promise<T> {
  const { 
    maxRetries = 3, 
    retryDelay = 1000,
    criticalOperation = false
  } = options;
  
  let attempts = 0;
  
  while (attempts <= maxRetries) {
    try {
      // Check connection before attempting critical operations
      if (criticalOperation && attempts > 0) {
        const isConnected = await checkConnection();
        if (!isConnected) {
          console.log(`Waiting for connection before retry ${attempts}/${maxRetries}...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay * 2));
          continue;
        }
      }
      
      // Attempt the operation
      const result = await operation();
      return result;
    } catch (error) {
      attempts++;
      
      // If it's a network error or we've reached max retries
      if (attempts > maxRetries || !isNetworkError(error)) {
        throw error instanceof Error ? error : new Error(String(error));
      }
      
      // Exponential backoff
      const delay = retryDelay * Math.pow(2, attempts - 1);
      console.log(`Operation failed, retrying in ${delay}ms (${attempts}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts`);
}

/**
 * Check if an error is likely a network-related error
 */
function isNetworkError(error: any): boolean {
  if (!error) return false;
  
  // Check for common network error patterns
  return (
    error.name === 'AbortError' ||
    error.message?.includes('network') ||
    error.message?.includes('connection') ||
    error.message?.includes('offline') ||
    error.message?.includes('timeout') ||
    error.message?.includes('abort') ||
    error.code === 'ECONNREFUSED' ||
    error.code === 'ETIMEDOUT' ||
    error.code === 'ERR_NETWORK'
  );
}

/**
 * Store information for later processing when back online
 * @param storageKey Key to use in localStorage
 * @param data Data to store
 */
export function storeForLaterProcessing(storageKey: string, data: any): void {
  try {
    const existingData = localStorage.getItem(storageKey);
    let pendingItems = existingData ? JSON.parse(existingData) : [];
    
    // Ensure pendingItems is an array
    if (!Array.isArray(pendingItems)) {
      pendingItems = [pendingItems];
    }
    
    // Add the new item with timestamp
    pendingItems.push({
      ...data,
      timestamp: new Date().toISOString()
    });
    
    localStorage.setItem(storageKey, JSON.stringify(pendingItems));
    console.log(`Stored item for later processing under ${storageKey}`);
  } catch (error) {
    console.error('Error storing data for later processing:', error);
  }
}

/**
 * Retrieve information stored for later processing
 * @param storageKey Key used in localStorage
 * @returns Array of stored items or null if none found
 */
export function retrieveStoredItems<T>(storageKey: string): T[] | null {
  try {
    const storedData = localStorage.getItem(storageKey);
    if (!storedData) return null;
    
    return JSON.parse(storedData) as T[];
  } catch (error) {
    console.error('Error retrieving stored items:', error);
    return null;
  }
}

/**
 * Remove stored items from localStorage
 * @param storageKey Key used in localStorage
 */
export function clearStoredItems(storageKey: string): void {
  localStorage.removeItem(storageKey);
}
