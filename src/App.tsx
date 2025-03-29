import { useEffect } from 'react';
import { RouterProvider, Route, Routes } from 'react-router-dom';
import { router } from './routes';
import { DevModeProvider } from './contexts/dev/DevModeContext';
import { AuthProvider } from './contexts/auth';
import { MarketProvider } from './components/layout/market-context';
import ImplementationGuide from './pages/implementation-guide';
import './App.css';

function App() {
  return (
    <DevModeProvider>
      <AuthProvider>
        <MarketProvider useDemoData={true}>
          <Routes>
            <Route path="/implementation-guide" element={<ImplementationGuide />} />
            <RouterProvider router={router} />
          </Routes>
        </MarketProvider>
      </AuthProvider>
    </DevModeProvider>
  );
}

export default App;
