// src/App.tsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes.config';
import { AuthProvider } from '@/contexts/auth';
import { MarketProvider } from '@/contexts/market/MarketContext';
import { Toaster } from '@/components/ui/toaster';

// Create router from config
const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <MarketProvider>
        <RouterProvider router={router} />
        <Toaster />
      </MarketProvider>
    </AuthProvider>
  );
}

export default App;