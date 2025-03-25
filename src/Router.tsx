
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthProvider";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/Profile";
import Home from "@/pages/index";
import LiveMarket from "@/pages/LiveMarket";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import AIAssistant from "@/pages/AIAssistant";

export default function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/market" element={<LiveMarket />} />
      
      {/* Auth routes */}
      <Route path="/auth/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/auth/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      
      {/* Protected routes */}
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={["admin", "shift-worker", "company", "agency", "aiagent"]}>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/ai-assistant" element={
        <ProtectedRoute allowedRoles={["admin", "shift-worker", "company", "agency", "aiagent"]}>
          <AIAssistant />
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

      {/* These routes redirect to their equivalents in the auth folder for better organization */}
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/register" element={<Navigate to="/auth/register" replace />} />
    </Routes>
  );
}
