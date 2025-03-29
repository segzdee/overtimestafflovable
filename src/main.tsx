
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DevModeProvider } from '@/contexts/dev/DevModeContext';
import { Toaster } from '@/components/ui/toaster';
import { startOnlineStatusMonitoring } from '@/lib/online-detection';
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
startOnlineStatusMonitoring();

// Render the app
root.render(
  <React.StrictMode>
    <DevModeProvider>
      <App />
      <Toaster />
    </DevModeProvider>
  </React.StrictMode>
);
