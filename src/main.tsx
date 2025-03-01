
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SupabaseProvider } from '@/lib/supabase/SupabaseProvider';
import { Toaster } from '@/components/ui/toaster';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Failed to find the root element. Make sure there is a <div id="root"></div> in your HTML.'
  );
}

const root = ReactDOM.createRoot(rootElement);

// Ensure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <SupabaseProvider>
          <App />
          <Toaster />
        </SupabaseProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
