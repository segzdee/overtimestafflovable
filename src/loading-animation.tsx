
import React from 'react';
import { Spinner } from '@/components/ui/spinner';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'; 
  text?: string;
  fullPage?: boolean;
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullPage = false,
  className = ''
}: LoadingProps) => {
  // Map size to spinner size
  const spinnerSize = size;

  // If fullPage is true, center in the viewport
  const containerClasses = fullPage 
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50' 
    : 'flex items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <Spinner size={spinnerSize} />
        {text && (
          <p className="text-gray-600 font-medium text-sm">{text}</p>
        )}
      </div>
    </div>
  );
};

// Secondary component for full-page loading with better visuals
const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
        <Spinner size="lg" className="mb-4" />
        <h3 className="text-lg font-semibold text-gray-800">Loading</h3>
        <p className="text-gray-500 text-center mt-2">Please wait while we prepare your content...</p>
      </div>
    </div>
  );
};

// For skeleton loading effects
const SkeletonLoader = ({ count = 1, className = '' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className={`bg-gray-200 animate-pulse rounded-md ${className}`}
        />
      ))}
    </>
  );
};

export { LoadingSpinner, PageLoader, SkeletonLoader };
export default LoadingSpinner;
