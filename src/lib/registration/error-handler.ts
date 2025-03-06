
export class RegistrationErrorHandler {
  /**
   * Helper to detect network errors
   */
  public isNetworkError(error: any): boolean {
    if (!error) return false;
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return (
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('Network request failed') ||
      errorMessage.includes('Network error') ||
      errorMessage.includes('network') ||
      errorMessage.includes('offline') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('timeout') ||
      navigator.onLine === false
    );
  }
  
  /**
   * Get user-friendly error message
   */
  public getErrorMessage(error: any): string {
    if (!error) return 'Unknown error occurred';
    
    if (error instanceof Error) {
      return error.message;
    }
    
    if (typeof error === 'object' && error !== null) {
      if ('message' in error) {
        return error.message as string;
      }
      if ('error_description' in error) {
        return error.error_description as string;
      }
      if ('error' in error && typeof error.error === 'string') {
        return error.error;
      }
    }
    
    return String(error);
  }
}
