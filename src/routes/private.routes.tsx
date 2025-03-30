
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AuthGuard from './guards/AuthGuard';
import Dashboard from '../pages/Dashboard';
import FindShifts from '../pages/find-shifts';
import FindStaff from '../pages/find-staff';
import Profile from '../pages/Profile';
import Forbidden from '../pages/Forbidden';

const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard/:role',
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    )
  },
  {
    path: '/find-shifts',
    element: (
      <AuthGuard>
        <FindShifts />
      </AuthGuard>
    )
  },
  {
    path: '/find-staff',
    element: (
      <AuthGuard>
        <FindStaff />
      </AuthGuard>
    )
  },
  {
    path: '/profile',
    element: (
      <AuthGuard>
        <Profile />
      </AuthGuard>
    )
  },
  {
    path: '/forbidden',
    element: <Forbidden />
  }
];

export default privateRoutes;
