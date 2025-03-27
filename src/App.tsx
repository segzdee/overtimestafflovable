
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/routes/routes.config';
import { AuthProvider } from '@/contexts/auth';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
