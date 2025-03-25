
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { Router } from './Router';
import './index.css';
import { Toaster } from 'sonner';
import { DevModeProvider } from './contexts/dev/DevModeContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DevModeProvider>
          <Router />
          <Toaster position="top-right" richColors />
        </DevModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
