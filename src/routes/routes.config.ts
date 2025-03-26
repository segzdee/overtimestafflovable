
import { RouteObject } from 'react-router-dom';
import Home from '@/pages';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import LiveMarket from '@/pages/LiveMarket';
import FindShifts from '@/pages/find-shifts';
import FindStaff from '@/pages/find-staff';
import VerifyEmail from '@/pages/verify-email';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import DashboardRouter from '@/pages/dashboard/[role]';
import NotFound from '@/pages/NotFound';
import Forbidden from '@/pages/Forbidden';
import ServerError from '@/pages/ServerError';
import Profile from '@/pages/Profile';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import TokenValidation from '@/pages/TokenValidation';

// Define route configuration
export const routes: RouteObject[] = [
  // Public routes
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />  // Redirect or alias
  },
  {
    path: '/auth/register',
    element: <Register />
  },
  {
    path: '/register',
    element: <Register />  // Redirect or alias
  },
  {
    path: '/market',
    element: <LiveMarket />
  },
  {
    path: '/live-market',
    element: <LiveMarket />
  },
  {
    path: '/find-shifts',
    element: <FindShifts />
  },
  {
    path: '/find-staff',
    element: <FindStaff />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/ai-token',
    element: <TokenValidation />
  },
  
  // Protected routes
  {
    path: '/profile',
    element: <ProtectedRoute element={<Profile />} />
  },
  
  // Dashboard routes
  {
    path: '/dashboard/:role',
    element: <ProtectedRoute element={<DashboardRouter />} />
  },
  
  // Error pages
  {
    path: '/forbidden',
    element: <Forbidden />
  },
  {
    path: '/error',
    element: <ServerError />
  },
  {
    path: '*',
    element: <NotFound />
  }
];
