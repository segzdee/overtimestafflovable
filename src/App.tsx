
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Router from "./Router";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { setupStorage } from "@/utils/setupStorage";
import { DevModeToggle } from "@/components/DevModeToggle";

function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize storage buckets on app start
  useEffect(() => {
    setupStorage();
  }, []);

  // Redirect authenticated users to their appropriate dashboard
  // but only if they're not already on a public page like the landing page
  useEffect(() => {
    if (!loading && user && location.pathname === "/") {
      const path = `/dashboard/${user.role.toLowerCase()}`;
      navigate(path);
    }
  }, [user, loading, navigate, location]);

  return (
    <>
      <Router />
      <DevModeToggle />
    </>
  );
}

export default App;
