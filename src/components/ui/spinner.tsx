
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClasses[size]} ${className}`}></div>
  );
};

export const FullPageSpinner: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};
