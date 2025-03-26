
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/routes/routes.config';
import { AuthProvider } from '@/contexts/auth';
import { Toaster } from '@/components/ui/toaster';

// Create router from config
const AppRouter = () => {
  const router = createBrowserRouter(routes);
  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
};

export default AppRouter;
