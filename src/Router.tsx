
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import App from './App';
import Login from './pages/login';
import Home from './pages/index';
import { ShiftWorkerRouter } from './features/shift-worker/ShiftWorkerRouter';
import { DevModeToggle } from './components/DevModeToggle';
import { ConnectionStatus } from './components/ConnectionStatus';

export function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      {/* Always render these components regardless of route */}
      <DevModeToggle />
      <ConnectionStatus />
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={user ? <App /> : <Navigate to="/login" />} />
        <Route path="/dashboard/shift-worker/*" element={
          user ? <ShiftWorkerRouter /> : <Navigate to="/login" />
        } />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
