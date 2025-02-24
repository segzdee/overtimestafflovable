
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<"admin" | "shift-worker" | "company" | "agency" | "aiagent">;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();
  
  // If not authenticated, redirect to login with return URL
  if (!user) {
    return <Navigate 
      to="/login" 
      replace 
      state={{ from: location.pathname }}
    />;
  }
  
  // If authenticated but wrong role, redirect to appropriate dashboard
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }
  
  return <>{children}</>;
}
