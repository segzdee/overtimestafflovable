import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthProvider";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/Profile";
import Home from "@/pages/Home";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";

// Import pages


export default function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      
      {/* Auth routes */}
      <Route path="/auth/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/auth/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      
      {/* Protected routes */}
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={["admin", "shift-worker", "company", "agency", "aiagent"]}>
          <Profile />
        </ProtectedRoute>
      } />

      {/* Dashboard routes based on role */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "shift-worker", "company", "agency", "aiagent"]}>
            {user && user.role === "shift-worker" ? (
              <Navigate to="/dashboard/shift-worker" />
            ) : user && user.role === "company" ? (
              <Navigate to="/dashboard/company" />
            ) : user && user.role === "agency" ? (
              <Navigate to="/dashboard/agency" />
            ) : user && user.role === "admin" ? (
              <Navigate to="/dashboard/admin" />
            ) : user && user.role === "aiagent" ? (
              <Navigate to="/dashboard/aiagent" />
            ) : (
              <Navigate to="/" />
            )}
          </ProtectedRoute>
        }
      />
      
      <Route path="/dashboard/:role" element={
        <ProtectedRoute allowedRoles={["admin", "shift-worker", "company", "agency", "aiagent"]}>
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* Add the rest of your routes here */}
    </Routes>
  );
}
