
import { AuthProvider } from './contexts/auth/AuthProvider';
import { DevModeProvider } from './contexts/dev/DevModeContext';
import AppRouter from './routes';
import './App.css';
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  return (
    <AuthProvider>
      <DevModeProvider>
        <AppRouter />
        <ConnectionStatus />
      </DevModeProvider>
    </AuthProvider>
  );
}

export default App;
