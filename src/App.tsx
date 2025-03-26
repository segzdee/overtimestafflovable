
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/routes/routes.config';
import { AuthProvider } from '@/contexts/auth';
import { MarketProvider } from '@/contexts/market/MarketContext';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <MarketProvider>
        <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
        <Toaster />
      </MarketProvider>
    </AuthProvider>
  );
}

export default App;
