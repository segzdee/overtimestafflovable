import { useState, useRef, useCallback, useEffect } from 'react';

interface UseFormSubmitOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  resetOnSuccess?: boolean;
}

/**
 * Utility hook to prevent duplicate form submissions and handle loading states
 * 
 * @param submitFn The async function that handles the form submission
 * @param options Configuration options
 * @returns Object containing submission state and handler function
 */
export function useFormSubmit<TFormData = any>(
  submitFn: (data: TFormData) => Promise<any>,
  options: UseFormSubmitOptions = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const isMounted = useRef(true);
  const submitCount = useRef(0);

  // Keep track of component mount state
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = useCallback(
    async (formData: TFormData) => {
      // Prevent duplicate submissions
      const currentSubmitCount = ++submitCount.current;
      
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);
      setError(null);
      setIsSuccess(false);

      try {
        const response = await submitFn(formData);
        
        // Only update state if this is the most recent submission and component is still mounted
        if (currentSubmitCount === submitCount.current && isMounted.current) {
          setIsSuccess(true);
          if (options.resetOnSuccess) {
            // Reset form if specified
            if (formData && typeof formData === 'object' && 'reset' in formData && typeof formData.reset === 'function') {
              formData.reset();
            }
          }
          if (options.onSuccess) {
            options.onSuccess(response);
          }
        }
        return response;
      } catch (err) {
        // Only update state if this is the most recent submission and component is still mounted
        if (currentSubmitCount === submitCount.current && isMounted.current) {
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          if (options.onError) {
            options.onError(error);
          }
        }
        throw err;
      } finally {
        // Only update state if this is the most recent submission and component is still mounted
        if (currentSubmitCount === submitCount.current && isMounted.current) {
          setIsSubmitting(false);
        }
      }
    },
    [isSubmitting, submitFn, options]
  );

  return {
    isSubmitting,
    error,
    isSuccess,
    handleSubmit,
    // Reset the form's state to initial values
    reset: useCallback(() => {
      setIsSubmitting(false);
      setError(null);
      setIsSuccess(false);
    }, [])
  };
}