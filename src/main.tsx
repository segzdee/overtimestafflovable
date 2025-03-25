
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { Router } from './Router';
import './index.css';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Router />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
