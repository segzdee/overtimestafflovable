
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRouteProps {
  element: ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ 
  element, 
  allowedRoles = [] 
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }
  
  // If roles specified and user doesn't have permission
  if (allowedRoles.length > 0 && user.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }
  
  // User is authenticated and authorized
  return <>{element}</>;
};
