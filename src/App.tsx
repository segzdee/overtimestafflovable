
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { router } from './routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
