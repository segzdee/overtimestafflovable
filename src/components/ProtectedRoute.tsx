
import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);
  
  // Effect to handle loading state
  useEffect(() => {
    // Simple timer to simulate auth initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
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
    // Store the location they were trying to access for redirect after login
    return <Navigate 
      to="/login" 
      replace 
      state={{ from: location.pathname }}
    />;
  }
  
  // Check if user has the required role for this route
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }
  
  // If everything checks out, render the protected content
  return <>{children}</>;
}
