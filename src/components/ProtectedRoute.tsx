import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<"admin" | "shift-worker" | "company" | "agency" | "aiagent">;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();
  
  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated but wrong role, redirect to appropriate dashboard
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }
  
  return <>{children}</>;
}
