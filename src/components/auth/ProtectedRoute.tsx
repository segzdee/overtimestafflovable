import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthContext";
import { BaseRole } from "@/lib/types";

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole?: BaseRole | BaseRole[];
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
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return URL
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
  if (!requiredRole || userHasRequiredRole(user?.role as BaseRole, requiredRole)) {
    return <>{element}</>;
  }

  // User doesn't have the required role, redirect to forbidden
  return <Navigate to="/forbidden" replace />;
};

// Helper function to check if user has the required role
function userHasRequiredRole(
  userRole: BaseRole,
  requiredRole: BaseRole | BaseRole[]
): boolean {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
}
