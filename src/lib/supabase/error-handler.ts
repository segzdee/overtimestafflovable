import { toast } from '@/hooks/use-toast';

export interface ApiError {
  code: string;
  message: string;
  details?: string;
  status?: number;
}

// Error codes mapped to user-friendly messages
const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'The email address is not valid.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/email-already-in-use': 'This email is already registered.',
  '23505': 'A record with this information already exists.',
  // Add more error mappings as needed
};

// Format error for UI display
export function formatApiError(error: any): ApiError {
  const code = error.code || (error.response?.status ? `${error.response.status}` : 'unknown');
  let message = ERROR_MESSAGES[code] || error.message || 'An unexpected error occurred';
  
  // Add specific handling for Supabase errors
  if (error.details) message += `. Details: ${error.details}`;
  
  return {
    code,
    message,
    details: error.details || '',
    status: error.response?.status
  };
}

// Handle API errors with consistent UI feedback
export function handleApiError(error: any, customMessage?: string): ApiError {
  const formattedError = formatApiError(error);
  
  // Show toast notification for the error
  toast({
    title: customMessage || 'Error',
    description: formattedError.message,
    variant: 'destructive',
    duration: 5000,
  });
  
  // Log detailed error for debugging
  console.error('API Error:', {
    message: formattedError.message,
    code: formattedError.code,
    details: formattedError.details,
    original: error
  });
  
  return formattedError;
}
