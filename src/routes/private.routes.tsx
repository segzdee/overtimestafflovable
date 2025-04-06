
import React from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { RootLayout } from '../components/layout/RootLayout';
import Dashboard from '../pages/Dashboard';

const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      }
    ]
  }
];

export default privateRoutes;
