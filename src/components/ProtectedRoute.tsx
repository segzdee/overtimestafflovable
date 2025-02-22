
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<"admin" | "shift-worker" | "company" | "agency" | "aiagent">;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();
  
  // Development bypass
  if (process.env.NODE_ENV === 'development') {
    const devBypass = localStorage.getItem('dev-bypass');
    if (devBypass === 'true') {
      // Simulate an admin user for development
      return <>{children}</>;
    }
  }
  
  // Regular authentication check
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Role check
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }
  
  return <>{children}</>;
}
