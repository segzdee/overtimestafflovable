
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DevModeToggle } from "./components/DevModeToggle";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { Suspense, lazy } from "react";
import { Skeleton } from "./components/ui/skeleton";

// Page loading component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f5]">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-8 w-[250px] mx-auto" />
      <Skeleton className="h-64 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-3/4 mx-auto rounded-md" />
    </div>
  </div>
);

// Lazy load pages
const Index = lazy(() => import("./pages/index"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const TokenValidation = lazy(() => import("./pages/TokenValidation"));
const FindShifts = lazy(() => import("./pages/find-shifts"));
const FindStaff = lazy(() => import("./pages/find-staff"));
const ShiftWorkerDashboard = lazy(() => import("./pages/ShiftWorkerDashboard"));
const CompanyDashboard = lazy(() => import("./pages/CompanyDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AgencyDashboard = lazy(() => import("./pages/AgencyDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/privacy"));
const Terms = lazy(() => import("./pages/terms"));
const Contact = lazy(() => import("./pages/contact"));
const Blog = lazy(() => import("./pages/blog"));
const BlogPost = lazy(() => import("./pages/blog-post"));
const RegistrationSuccess = lazy(() => import("./pages/registration-success"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));
const UserTypeSelection = lazy(() => import("./pages/UserTypeSelection"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute cache
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
                <Route 
                  path="/" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <Index />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <UserTypeSelection />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/register/:userType" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <Register />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/registration-success" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <RegistrationSuccess />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/login" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <Login />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/forgot-password" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <ForgotPassword />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/reset-password" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <ResetPassword />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/token-validation" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <TokenValidation />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/find-shifts" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <FindShifts />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/find-staff" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <FindStaff />
                    </Suspense>
                  } 
                />
                
                <Route 
                  path="/privacy" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <Privacy />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/terms" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <Terms />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <Contact />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/blog" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <Blog />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/blog-post" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <BlogPost />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/blog/:slug" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <BlogPost />
                    </Suspense>
                  } 
                />
                
                <Route 
                  path="/complete-profile/:userType" 
                  element={
                    <ProtectedRoute allowedRoles={["admin", "shift-worker", "company", "agency", "aiagent"]}>
                      <Suspense fallback={<PageLoading />}>
                        <CompleteProfile />
                      </Suspense>
                    </ProtectedRoute>
                  } 
                />
                
                <Route
                  path="/dashboard/shift-worker/*"
                  element={
                    <ProtectedRoute allowedRoles={["shift-worker"]}>
                      <Suspense fallback={<PageLoading />}>
                        <ShiftWorkerDashboard />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/dashboard/company/*"
                  element={
                    <ProtectedRoute allowedRoles={["company"]}>
                      <Suspense fallback={<PageLoading />}>
                        <CompanyDashboard />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/dashboard/admin/*"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <Suspense fallback={<PageLoading />}>
                        <AdminDashboard />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/dashboard/agency/*"
                  element={
                    <ProtectedRoute allowedRoles={["agency"]}>
                      <Suspense fallback={<PageLoading />}>
                        <AgencyDashboard />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                
                <Route 
                  path="*" 
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <NotFound />
                    </Suspense>
                  } 
                />
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
