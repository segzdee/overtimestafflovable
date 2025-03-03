
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useDevMode } from "@/contexts/dev/DevModeContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<"admin" | "shift-worker" | "company" | "agency" | "aiagent">;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();
  const { devMode, selectedRole } = useDevMode();
  
  // If in developer mode and a role is selected, bypass authentication
  if (devMode && selectedRole) {
    // Check if selected role is allowed for this route
    if (allowedRoles.includes(selectedRole)) {
      return <>{children}</>;
    } else {
      // Redirect to appropriate dashboard based on selected role
      return <Navigate to={`/dashboard/${selectedRole.toLowerCase()}`} replace />;
    }
  }
  
  // Normal authentication flow
  if (!user) {
    return <Navigate 
      to="/login" 
      replace 
      state={{ from: location.pathname }}
    />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }
  
  return <>{children}</>;
}
