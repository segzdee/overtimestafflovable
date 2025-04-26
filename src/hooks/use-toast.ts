
import React from 'react';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'destructive';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastType;
  duration?: number;
}

// Simple toast hook implementation
export function useToast() {
  const toast = (options: ToastOptions) => {
    console.log(`Toast: ${options.title} - ${options.description} [${options.variant || 'default'}]`);
    // In a real implementation, this would show a toast notification
  };

  return { toast };
}

// Direct toast function for convenience
export const toast = (options: ToastOptions) => {
  console.log(`Toast: ${options.title} - ${options.description} [${options.variant || 'default'}]`);
};
