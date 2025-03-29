import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { MarketProvider } from './components/layout/market-context';
import { routes } from './routes/routes.config';
import './App.css';

// Create router from routes config
const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <MarketProvider useDemoData={true}>
        <RouterProvider router={router} />
      </MarketProvider>
    </AuthProvider>
  );
}

export default App;
