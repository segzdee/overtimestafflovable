import React, { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from "@/contexts/auth/AuthProvider";

const DashboardContent = React.lazy(() => import('../components/DashboardContent'));

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
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
