import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DevModeToggle } from "./components/DevModeToggle";
import { ErrorBoundary } from "./components/error/ErrorBoundary";

// Pages
import Index from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TokenValidation from "./pages/TokenValidation";
import FindShifts from "./pages/find-shifts";
import FindStaff from "./pages/find-staff";
import ShiftWorkerDashboard from "./pages/ShiftWorkerDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AgencyDashboard from "./pages/AgencyDashboard";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog-post";
import RegistrationSuccess from "./pages/registration-success";
import CompleteProfile from "./pages/CompleteProfile";
import UserTypeSelection from "./pages/UserTypeSelection";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <div className="h-full">
            <Toaster />
            <Sonner />
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<UserTypeSelection />} />
                <Route path="/register/:userType" element={<Register />} />
                <Route path="/registration-success" element={<RegistrationSuccess />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/token-validation" element={<TokenValidation />} />
                <Route path="/find-shifts" element={<FindShifts />} />
                <Route path="/find-staff" element={<FindStaff />} />
                
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog-post" element={<BlogPost />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                
                <Route 
                  path="/complete-profile/:userType" 
                  element={
                    <ProtectedRoute allowedRoles={["admin", "shift-worker", "company", "agency", "aiagent"]}>
                      <CompleteProfile />
                    </ProtectedRoute>
                  } 
                />
                
                <Route
                  path="/dashboard/shift-worker/*"
                  element={
                    <ProtectedRoute allowedRoles={["shift-worker"]}>
                      <ShiftWorkerDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/dashboard/company/*"
                  element={
                    <ProtectedRoute allowedRoles={["company"]}>
                      <CompanyDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/dashboard/admin/*"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/dashboard/agency/*"
                  element={
                    <ProtectedRoute allowedRoles={["agency"]}>
                      <AgencyDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <DevModeToggle />
            </TooltipProvider>
          </div>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
