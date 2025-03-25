
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DevModeProvider } from '@/contexts/dev/DevModeContext';
import { Toaster } from '@/components/ui/toaster';
import { initConnectionHandling } from '@/lib/robust-connection-handler';
import { AuthProvider } from '@/contexts/auth/AuthProvider';
import { initializePWA } from '@/utils/pwa';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Failed to find the root element. Make sure there is a <div id="root"></div> in your HTML.'
  );
}

const root = ReactDOM.createRoot(rootElement);

// Initialize connection handling
initConnectionHandling();

// Initialize PWA features
if (import.meta.env.MODE === 'production') {
  initializePWA();
}

// Ensure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <DevModeProvider>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </DevModeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
