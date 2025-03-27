
import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'secondary' | 'destructive' | 'muted';
  color?: 'red' | 'blue' | 'green';
}

export function Spinner({ 
  className, 
  size = 'md', 
  variant = 'default', 
  color,
  ...props 
}: SpinnerProps) {
  // Define class variants
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-2",
    xl: "h-12 w-12 border-3",
  };
  
  const variantClasses = {
    default: "text-primary",
    secondary: "text-secondary",
    destructive: "text-destructive",
    muted: "text-muted-foreground",
  };
  
  const colorClasses = {
    red: "text-red-500",
    blue: "text-blue-500",
    green: "text-green-500",
  };
  
  const baseClasses = "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]";
  
  // Determine which classes to apply
  const classes = [
    baseClasses,
    sizeClasses[size],
    variant && variantClasses[variant],
    color && colorClasses[color],
  ].filter(Boolean);
  
  return (
    <div
      className={cn(classes.join(' '), className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
