import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/index";
import Login from "./pages/login";
import AdminLogin from "./pages/admin-login";
import Register from "./pages/register";
import FindShifts from "./pages/find-shifts";
import FindStaff from "./pages/find-staff";
import ShiftWorkerDashboard from "./pages/ShiftWorkerDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AgencyDashboard from "./pages/AgencyDashboard";
import NotFound from "./pages/NotFound";
import TokenLogin from "./pages/token-login";

const queryClient = new QueryClient();

const RootRoute = () => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }
  
  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<RootRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/token-login" element={<TokenLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/find-shifts" element={<FindShifts />} />
            <Route path="/find-staff" element={<FindStaff />} />
            
            <Route
              path="/dashboard/shift-worker"
              element={
                <ProtectedRoute allowedRoles={["shift-worker"]}>
                  <ShiftWorkerDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/company"
              element={
                <ProtectedRoute allowedRoles={["company", "aiagent"]}>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/agency"
              element={
                <ProtectedRoute allowedRoles={["agency", "aiagent"]}>
                  <AgencyDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
