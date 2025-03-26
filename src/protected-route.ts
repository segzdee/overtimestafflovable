import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { BaseRole } from '@/lib/types';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: BaseRole[];
  redirectPath?: string;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectPath = '/auth/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Log access attempts for security monitoring
  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.warn(`Unauthenticated access attempt to protected route: ${location.pathname}`);
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        console.warn(`Unauthorized access attempt by ${user.email} (${user.role}) to route: ${location.pathname}`);
      }
    }
  }, [user, loading, location.pathname, allowedRoles]);

  // If still loading auth state, show nothing (or a loading spinner)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" variant="default" />
      </div>
    );
  }

  // If not logged in, redirect to login page with return path
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  // If user doesn't have required role, redirect to forbidden page
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  // If user is authenticated and authorized, render the children
  return <>{children}</>;
}