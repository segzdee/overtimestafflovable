
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import App from './App';
import Login from './pages/login';  // Changed casing to match actual file name

export function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <App /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
