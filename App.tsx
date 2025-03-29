import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/auth/AuthContext';
import { DevModeProvider } from '@/contexts/dev/DevModeContext';
import Layout from '@/components/layout/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';

// Pages
import Home from '@/pages/home';
import FindShifts from '@/pages/find-shifts';
import FindStaff from '@/pages/find-staff';
import LiveMarket from '@/pages/live-market';
import Login from '@/pages/login';
import Register from '@/pages/register';
import NotFound from '@/pages/not-found';

// Development Admin Pages
import DevAdmin from '@/pages/dev-admin';

// List of allowed development URLs for dev routes
const ALLOWED_DEV_URLS = [
  'localhost',
  '127.0.0.1',
  'dev.overtimestaff.com',
  'staging.overtimestaff.com',
  'test.overtimestaff.com'
];

// Protected route component for authenticated routes
const AuthProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {ent for authenticated routes
    // Redirect to login but save the location they were trying to accessps) => {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }onst location = useLocation();
  
  return <>{children}</>;or while checking auth
};if (isLoading) {
    return <div className="h-screen flex items-center justify-center">
// Protected route component for dev routesfull h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
const DevProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const isDevEnvironment = ALLOWED_DEV_URLS.some(url => 
    window.location.hostname.includes(url) Check authentication
  );if (!isAuthenticated) {
  login" state={{ from: location }} replace />;
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>// Check role requirements if specified
    </div>;r?.role) {
  }  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      if (!roles.includes(user.role)) {
  // Check both environment and admin privilegesbidden" replace />;
  if (!isDevEnvironment || !isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  />;
  return <>{children}</>;
};
v routes
export default function App() {t.ReactNode }) => {
  return (
    <ErrorBoundary>ation.hostname.includes(url)
      <BrowserRouter>
        <AuthProvider>
          <DevModeProvider>
            <Routes>gate to="/" replace />;
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Main application routes with layout */}
              <Route path="/" element={<Layout />}>ion App() {
                <Route index element={<Home />} />
                
                {/* Protected routes that require authentication */}
                <Route path="find-shifts" element={
                  <AuthProtectedRoute>ovider>
                    <FindShifts />
                  </AuthProtectedRoute>
                } /> element={<Login />} />
                <Route path="find-staff" element={lement={<Register />} />
                  <AuthProtectedRoute>
                    <FindStaff />* Main application routes with layout */}
                  </AuthProtectedRoute><Layout />}>
                } />
                <Route path="live-market" element={
                  <AuthProtectedRoute>  {/* Protected routes that require authentication */}
                    <LiveMarket />t={
                  </AuthProtectedRoute>thProtectedRoute>
                } />
                rotectedRoute>
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />d-staff" element={
              </Route>
                <FindStaff />
              {/* Protected developer routes */}  </AuthProtectedRoute>
              <Route 
                path="/dev-admin/*" "live-market" element={
                element={ProtectedRoute>
                  <DevProtectedRoute>iveMarket />
                    <DevAdmin />AuthProtectedRoute>
                  </DevProtectedRoute>            } />
                }                








}  );    </ErrorBoundary>      </BrowserRouter>        </AuthProvider>          </DevModeProvider>            </Routes>              />                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Route>
              
              {/* Protected developer routes */}
              <Route 
                path="/dev-admin/*" 
                element={
                  <DevProtectedRoute>
                    <DevAdmin />
                  </DevProtectedRoute>
                } 
              />
            </Routes>
          </DevModeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}