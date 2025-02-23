
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SupabaseProvider } from '@/lib/supabase/SupabaseProvider';
import { Toaster } from '@/components/ui/toaster';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SupabaseProvider>
          <App />
          <Toaster />
      </SupabaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
