import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from '../pages';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import LiveMarket from '../pages/LiveMarket';
import FindShifts from '../pages/find-shifts';
import FindStaff from '../pages/find-staff';
import VerifyEmail from '../pages/verify-email';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import DashboardRouter from '../pages/dashboard/[role]';
import NotFound from '../pages/NotFound';
import Forbidden from '../pages/Forbidden';
import ServerError from '../pages/ServerError';
import Profile from '../pages/Profile';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import TokenValidation from '../pages/TokenValidation';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { RootLayout } from '../components/layout/RootLayout';
import Terms from '../pages/terms';
import Blog from '../pages/blog';
import BlogPost from '../pages/blog-post';
import AIAssistant from '../pages/AIAssistant';
import ImplementationGuide from '../pages/implementation-guide';

// Define route configuration
export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      // Public routes
      {
        path: '/',
        element: <Home />
      },
      // Auth routes with layout
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          },
        ]
      },
      // Redirects/aliases
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
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
      {
        path: '/terms',
        element: <Terms />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/blog/:slug',
        element: <BlogPost />
      },
      {
        path: '/ai-assistant',
        element: <ProtectedRoute element={<AIAssistant />} />
      },
      {
        path: '/implementation-guide',
        element: <ImplementationGuide />
      },
      
      // Protected routes
      {
        path: '/profile',
        element: <ProtectedRoute element={<Profile />} />
      },
      
      // Dashboard routes with layout
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: ':role/*',
            element: <ProtectedRoute element={<DashboardRouter />} />
          }
        ]
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
    ]
  }
];
