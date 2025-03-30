
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();
  const { role } = useParams();
  
  // If no user, redirect to login with return path
  if (!user) {
    return <Navigate to="/auth/login" state={{ returnPath: location.pathname }} replace />;
  }
  
  // If user has a role and is trying to access a different role's dashboard
  if (role && user.role && role !== user.role) {
    // Redirect to their correct dashboard
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  
  return children;
}
