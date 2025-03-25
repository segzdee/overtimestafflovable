
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/auth';

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the appropriate dashboard based on user role
    if (user) {
      switch (user.role) {
        case 'shift-worker':
          navigate('/dashboard/shift-worker');
          break;
        case 'company':
          navigate('/dashboard/company');
          break;
        case 'agency':
          navigate('/dashboard/agency');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/dashboard/shift-worker');
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to your dashboard...</h1>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
      </div>
    </div>
  );
}

export default App;
