
import { 
  useOnlineStatus, 
  checkOnlineStatus, 
  startOnlineStatusMonitoring, 
  addOnlineStatusListener 
} from '@/lib/online-detection';

// Type definitions
interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  criticalOperation: boolean;
}

/**
 * Checks if the device is currently online
 */
export const isOnline = checkOnlineStatus;

/**
 * Initializes the connection handling system
 */
export const initConnectionHandling = startOnlineStatusMonitoring;

/**
 * Executes a function with automatic retry on connection failure
 * @param fn The function to execute
 * @param options Options for retry behavior
 */
export async function executeWithConnectionRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  const { maxRetries, baseDelay, criticalOperation } = options;
  let attempt = 0;
  
  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;
      
      // Check if we should retry
      const isConnectionError = 
        !navigator.onLine || 
        error.message.includes('network') ||
        error.message.includes('connection') ||
        error.message.includes('timeout') ||
        error.message.includes('ECONNREFUSED') ||
        error.message.includes('ETIMEDOUT');
        
      if (!isConnectionError || attempt >= maxRetries) {
        throw error;
      }
      
      // Wait before retry with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // For critical operations, check for online status before retrying
      if (criticalOperation) {
        const online = await checkOnlineStatus();
        if (!online) {
          throw new Error('Operation cannot be completed while offline');
        }
      }
    }
  }
}

// Hook for components to use online status
export { useOnlineStatus };

// Listener for connection status changes
export { addOnlineStatusListener };
