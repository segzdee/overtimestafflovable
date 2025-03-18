
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SupabaseProvider } from '@/lib/supabase/SupabaseProvider';
import { DevModeProvider } from '@/contexts/dev/DevModeContext';
import { Toaster } from '@/components/ui/toaster';
import { initConnectionHandling } from '@/lib/robust-connection-handler';
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

// Ensure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <SupabaseProvider>
          <DevModeProvider>
            <App />
            <Toaster />
          </DevModeProvider>
        </SupabaseProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
