
import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ShiftWorkerDashboard from '../ShiftWorkerDashboard';
import CompanyDashboard from '../CompanyDashboard';
import AdminDashboard from '../AdminDashboard';
import AgencyDashboard from '../AgencyDashboard';

export default function DashboardRouter() {
  const { role } = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
      }
    };
    checkAuth();
  }, []);

  switch (role) {
    case 'shift-worker':
      return <ShiftWorkerDashboard />;
    case 'company':
      return <CompanyDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'agency':
      return <AgencyDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
}
