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
  
  if (!isAuthenticated) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Protected route component for dev routes
const DevProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isDevEnvironment = ALLOWED_DEV_URLS.some(url => 
    window.location.hostname.includes(url)
  );
  
  if (!isDevEnvironment) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <DevModeProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Main application routes with layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                
                {/* Protected routes that require authentication */}
                <Route path="find-shifts" element={
                  <AuthProtectedRoute>
                    <FindShifts />
                  </AuthProtectedRoute>
                } />
                <Route path="find-staff" element={
                  <AuthProtectedRoute>
                    <FindStaff />
                  </AuthProtectedRoute>
                } />
                <Route path="live-market" element={
                  <AuthProtectedRoute>
                    <LiveMarket />
                  </AuthProtectedRoute>
                } />
                
                {/* Catch-all route */}
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