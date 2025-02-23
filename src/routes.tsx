
import { lazy, Suspense } from 'react';
import { Navigate, Routes as RouterRoutes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

// Lazy load components
const Login = lazy(() => import('@/pages/login'));
const Register = lazy(() => import('@/pages/register'));
const TokenLogin = lazy(() => import('@/pages/token-login'));
const AdminLogin = lazy(() => import('@/pages/admin-login'));
const ShiftWorkerDashboard = lazy(() => import('@/pages/ShiftWorkerDashboard'));
const CompanyDashboard = lazy(() => import('@/pages/CompanyDashboard'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const AgencyDashboard = lazy(() => import('@/pages/AgencyDashboard'));
const FindShifts = lazy(() => import('@/pages/find-shifts'));
const FindStaff = lazy(() => import('@/pages/find-staff'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

export const Routes = () => (
  <RouterRoutes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    
    <Route
      path="/login"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <Login />
        </Suspense>
      }
    />
    
    <Route
      path="/token-login"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <TokenLogin />
        </Suspense>
      }
    />
    
    <Route
      path="/register"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <Register />
        </Suspense>
      }
    />
    
    <Route
      path="/admin-login"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <AdminLogin />
        </Suspense>
      }
    />
    
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route
        path="shift-worker"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ShiftWorkerDashboard />
          </Suspense>
        }
      />
      
      <Route
        path="company"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <CompanyDashboard />
          </Suspense>
        }
      />
      
      <Route
        path="admin"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminDashboard />
          </Suspense>
        }
      />
      
      <Route
        path="agency"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <AgencyDashboard />
          </Suspense>
        }
      />
    </Route>
    
    <Route
      path="/find-shifts"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <FindShifts />
        </Suspense>
      }
    />
    
    <Route
      path="/find-staff"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <FindStaff />
        </Suspense>
      }
    />
    
    <Route
      path="*"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <NotFound />
        </Suspense>
      }
    />
  </RouterRoutes>
);
