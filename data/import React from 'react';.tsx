import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { DevModeProvider } from '@/contexts/dev/DevModeContext';
import Layout from '@/components/layout/Layout';

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
    <BrowserRouter>
      <AuthProvider>
        <DevModeProvider>
          <Routes>
            {/* Main application routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="find-shifts" element={<FindShifts />} />
              <Route path="find-staff" element={<FindStaff />} />
              <Route path="live-market" element={<LiveMarket />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
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
  );
}
