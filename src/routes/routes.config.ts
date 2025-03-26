import { RouteObject } from 'react-router-dom';
import Home from '@/pages';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import LiveMarket from '@/pages/LiveMarket';
import DashboardRouter from '@/pages/dashboard/[role]';
import NotFound from '@/pages/NotFound';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export const routes: RouteObject[] = [
  // Public routes
  { path: '/', element: <Home /> },
  { path: '/auth/login', element: <Login /> },
  { path: '/auth/register', element: <Register /> },
  { path: '/market', element: <LiveMarket /> },

  // Protected routes
  { path: '/dashboard/:role', element: <ProtectedRoute element={<DashboardRouter />} /> },

  // Error routes
  { path: '*', element: <NotFound /> },
];
