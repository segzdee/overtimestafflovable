
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/routes/routes.config';
import { AuthProvider } from '@/contexts/auth';
import { Toaster } from '@/components/ui/toaster';
import { DevModeProvider } from '@/contexts/dev/DevModeContext';
import { DevModeToggle } from '@/components/dev';

// Create router from config
const AppRouter = () => {
  const router = createBrowserRouter(routes);
  
  return (
    <AuthProvider>
      <DevModeProvider>
        <RouterProvider router={router} />
        <DevModeToggle />
        <Toaster />
      </DevModeProvider>
    </AuthProvider>
  );
};

export default AppRouter;
