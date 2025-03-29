import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { LoadingSpinner } from "@/src/loading-animation";

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole?: string | string[];
}

export const ProtectedRoute = ({ 
  element, 
  requiredRole 
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullPage text="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Optional role-based access control
  if (requiredRole && user.role) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    
    if (!roles.includes(user.role)) {
      return <Navigate to="/forbidden" replace />;
    }
  }

  return <>{element}</>;
};
