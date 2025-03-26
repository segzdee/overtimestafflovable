// src/routes/routes.config.ts
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
import ShiftWorkerDashboard from '@/pages/ShiftWorkerDashboard';
import CompanyDashboard from '@/pages/CompanyDashboard';
import AgencyDashboard from '@/pages/AgencyDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from '@/pages/NotFound';
import Forbidden from '@/pages/Forbidden';
import ServerError from '@/pages/ServerError';
import HelpCenter from '@/pages/help';
import SupportTicket from '@/pages/help/SupportTicket';
import Faq from '@/pages/help/Faq';
import Privacy from '@/pages/privacy';
import Terms from '@/pages/terms';
import Contact from '@/pages/contact';
import Blog from '@/pages/blog';
import BlogPost from '@/pages/blog-post';
import UserTypeSelection from '@/pages/UserTypeSelection';
import CompleteProfile from '@/pages/CompleteProfile';
import Profile from '@/pages/Profile';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

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
    path: '/register/:userType',
    element: <Register />
  },
  {
    path: '/user-type',
    element: <UserTypeSelection />
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
  
  // Help and information pages
  {
    path: '/help',
    element: <HelpCenter />
  },
  {
    path: '/help/faq',
    element: <Faq />
  },
  {
    path: '/help/ticket',
    element: <SupportTicket />
  },
  {
    path: '/privacy',
    element: <Privacy />
  },
  {
    path: '/terms',
    element: <Terms />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/blog',
    element: <Blog />
  },
  {
    path: '/blog/:slug',
    element: <BlogPost />
  },
  
  // Protected routes
  {
    path: '/profile',
    element: <ProtectedRoute element={<Profile />} />
  },
  {
    path: '/complete-profile/:userType',
    element: <ProtectedRoute element={<CompleteProfile />} />
  },
  
  // Dashboard routes
  {
    path: '/dashboard/:role',
    element: <DashboardRouter />
  },
  {
    path: '/dashboard/shift-worker/*',
    element: <ProtectedRoute element={<ShiftWorkerDashboard />} allowedRoles={['shift-worker']} />
  },
  {
    path: '/dashboard/company/*',
    element: <ProtectedRoute element={<CompanyDashboard />} allowedRoles={['company']} />
  },
  {
    path: '/dashboard/agency/*',
    element: <ProtectedRoute element={<AgencyDashboard />} allowedRoles={['agency']} />
  },
  {
    path: '/dashboard/admin/*',
    element: <ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />
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