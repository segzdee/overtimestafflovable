import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { MarketProvider } from './components/layout/market-context';
import ImplementationGuide from './pages/implementation-guide';
import { routes } from './routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MarketProvider useDemoData={true}>
        <BrowserRouter>
          <Routes>
            <Route path="/implementation-guide" element={<ImplementationGuide />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </MarketProvider>
    </AuthProvider>
  );
}

export default App;
