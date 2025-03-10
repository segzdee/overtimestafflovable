
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
