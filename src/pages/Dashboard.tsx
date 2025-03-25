
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from "@/contexts/auth/AuthProvider";

export default function Dashboard() {
  const { role } = useParams();
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // If role parameter doesn't match user's role, redirect to correct dashboard
  if (role && role !== user.role) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  
  // Temporary dashboard content based on role
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 mb-4">
          Welcome back, {user.name}!
        </p>
        <p className="text-gray-600">
          This is your {user.role} dashboard. More features will be available soon.
        </p>
      </div>
    </div>
  );
}
