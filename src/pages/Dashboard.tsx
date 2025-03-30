
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/auth/useAuth";
import ShiftWorkerDashboard from '../components/dashboards/ShiftWorkerDashboard';
import CompanyDashboard from '../components/dashboards/CompanyDashboard';
import AgencyDashboard from '../components/dashboards/AgencyDashboard';

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
  
  // Render appropriate dashboard based on role
  switch (user.role) {
    case 'shift-worker':
      return <ShiftWorkerDashboard />;
    case 'company':
      return <CompanyDashboard />;
    case 'agency':
      return <AgencyDashboard />;
    default:
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
          <p className="text-gray-600">Your role: {user.role || 'Not specified'}</p>
        </div>
      );
  }
}
