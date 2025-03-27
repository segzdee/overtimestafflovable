
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { DevModeProvider } from './contexts/dev/DevModeContext';
import { DevModeToggle } from './components/dev/DevModeToggle';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { MarketProvider } from './components/layout/market-context';
import './App.css';

function App() {
  return (
    <DevModeProvider>
      <AuthProvider>
        <MarketProvider useDemoData={true}>
          <RouterProvider router={router} />
          <DevModeToggle />
        </MarketProvider>
      </AuthProvider>
    </DevModeProvider>
  );
}

export default App;
