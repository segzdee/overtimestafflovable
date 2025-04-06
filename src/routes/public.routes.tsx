
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { RootLayout } from '../components/layout/RootLayout';
import Home from '../pages/Home';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
];

export default publicRoutes;
