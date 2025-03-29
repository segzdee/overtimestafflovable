
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { router } from './routes';
import './App.css';
import { DevModeProvider } from './contexts/dev/DevModeContext';
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  return (
    <AuthProvider>
      <DevModeProvider>
        <RouterProvider router={router} />
        <ConnectionStatus />
      </DevModeProvider>
    </AuthProvider>
  );
}

export default App;
