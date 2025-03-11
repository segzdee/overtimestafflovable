
// This is a simplified version that doesn't rely on Supabase
type RetryOptions = {
  maxRetries?: number;
  delay?: number;
  exponentialBackoff?: boolean;
  criticalOperation?: boolean;
};

export const executeWithConnectionRetry = async <T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const {
    maxRetries = 3,
    delay = 1000,
    exponentialBackoff = true,
    criticalOperation = false
  } = options;
  
  let lastError: any;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error);
      
      if (attempt < maxRetries - 1) {
        const waitTime = exponentialBackoff
          ? delay * Math.pow(2, attempt)
          : delay;
          
        console.log(`Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  // If we get here, all retries failed
  if (criticalOperation) {
    console.error(`Critical operation failed after ${maxRetries} attempts`);
  }
  
  throw lastError;
};

// Check if we have an active internet connection
export const checkConnection = async (): Promise<boolean> => {
  // Basic check if we're online according to the browser
  if (!navigator.onLine) {
    return false;
  }
  
  // More reliable check: try to fetch a small resource
  try {
    // Using a common endpoint that should always be available
    // The cache bust parameter ensures we don't get a cached response
    const response = await fetch(`https://www.google.com/favicon.ico?cachebust=${Date.now()}`, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
    });
    
    // If we got here, we have connectivity
    return true;
  } catch (error) {
    console.error('Connection check failed:', error);
    return false;
  }
};

// Listeners for online/offline events
let onlineListener: (() => void) | null = null;
let offlineListener: (() => void) | null = null;

// Initialize connection handling and monitoring
export const initConnectionHandling = (): (() => void) => {
  // Handler for when we go online
  onlineListener = () => {
    console.log('Connection restored');
    // You could trigger any pending operations here
  };
  
  // Handler for when we go offline
  offlineListener = () => {
    console.log('Connection lost');
    // You could pause operations or show a notification here
  };
  
  // Add event listeners
  window.addEventListener('online', onlineListener);
  window.addEventListener('offline', offlineListener);
  
  // Initial connection check
  checkConnection().then((connected) => {
    console.log(`Initial connection status: ${connected ? 'online' : 'offline'}`);
  });
  
  // Return cleanup function
  return () => {
    if (onlineListener) window.removeEventListener('online', onlineListener);
    if (offlineListener) window.removeEventListener('offline', offlineListener);
    console.log('Connection handling cleanup complete');
  };
};
