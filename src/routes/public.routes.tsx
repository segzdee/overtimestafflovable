
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import UserTypeSelection from '../pages/UserTypeSelection';
import CompleteProfile from '../pages/CompleteProfile';
import ForgotPassword from '../pages/auth/ForgotPassword';
import LiveMarket from '../pages/LiveMarket';
import NotFound from '../pages/NotFound';

const publicRoutes: RouteObject[] = [
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
    element: <Login />
  },
  {
    path: '/auth/register',
    element: <Register />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/user-type',
    element: <UserTypeSelection />
  },
  {
    path: '/complete-profile/:userType',
    element: <CompleteProfile />
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/live-market',
    element: <LiveMarket />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default publicRoutes;
