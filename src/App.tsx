
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Router from "./Router";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { setupStorage } from "@/utils/setupStorage";

function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Initialize storage buckets on app start
  useEffect(() => {
    setupStorage();
  }, []);

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (!loading && user) {
      const path = `/dashboard/${user.role.toLowerCase()}`;
      navigate(path);
    }
  }, [user, loading, navigate]);

  return <Router />;
}

export default App;
