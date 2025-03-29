import React from 'react';
import { useParams } from 'react-router-dom';
import { ShiftWorkerRouter } from '@/features/shift-worker/ShiftWorkerRouter';
import { CompanyRouter } from '@/features/company/CompanyRouter';
import { AgencyRouter } from '@/features/agency/AgencyRouter';
import { AdminRouter } from '@/features/admin/AdminRouter';
import NotFound from '../NotFound';

// Role-based router mapping for better maintainability
const ROLE_ROUTERS = {
  'shift-worker': ShiftWorkerRouter,
  'company': CompanyRouter,
  'agency': AgencyRouter,
  'admin': AdminRouter,
};

export default function RoleDashboardRouter() {
  const { role } = useParams();
  
  const RoleRouter = role ? ROLE_ROUTERS[role] : undefined;
  
  if (RoleRouter) {
    return <RoleRouter />;
  }
  
  return <NotFound />;
}
