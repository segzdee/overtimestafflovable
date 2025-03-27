import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthContext";
import { FullPageSpinner } from "@/components/ui/spinner";

type Role = "shift-worker" | "company" | "agency" | "admin" | "aiagent";

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole?: Role | Role[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requiredRole,
  redirectTo = "/auth/login",
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <FullPageSpinner />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // If no specific role is required, or user has the required role, show the element
  if (!requiredRole || userHasRequiredRole(user?.role as Role, requiredRole)) {
    return <>{element}</>;
  }

  // User doesn't have the required role, redirect to forbidden
  return <Navigate to="/forbidden" replace />;
};

// Helper function to check if user has the required role
function userHasRequiredRole(
  userRole: Role,
  requiredRole: Role | Role[]
): boolean {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
}