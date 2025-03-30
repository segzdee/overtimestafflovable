import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
