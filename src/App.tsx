
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { DevModeProvider } from './contexts/dev/DevModeContext';
import { AuthProvider } from './contexts/auth';
import { MarketProvider } from './components/layout/market-context';
import './App.css';

function App() {
  return (
    <DevModeProvider>
      <AuthProvider>
        <MarketProvider useDemoData={true}>
          <RouterProvider router={router} />
        </MarketProvider>
      </AuthProvider>
    </DevModeProvider>
  );
}

export default App;
