
import { useParams, Navigate } from 'react-router-dom';
import ShiftWorkerDashboard from '../ShiftWorkerDashboard';
import CompanyDashboard from '../CompanyDashboard';
import AdminDashboard from '../AdminDashboard';

export default function DashboardRouter() {
  const { role } = useParams();

  switch (role) {
    case 'worker':
      return <ShiftWorkerDashboard />;
    case 'company':
      return <CompanyDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
}
