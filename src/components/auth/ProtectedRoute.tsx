
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthContext";
import { LoadingSpinner } from "@/loading-animation";

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole?: string | string[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  element, 
  requiredRole,
  redirectTo = "/auth/login"
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner fullPage text="Checking authentication..." />;
  }
  
  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }
  
  // Optional role-based access control
  if (requiredRole && user.role) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    
    if (!roles.includes(user.role)) {
      return <Navigate to="/forbidden" replace />;
    }
  }
  
  // User is authenticated and authorized
  return <>{element}</>;
};
