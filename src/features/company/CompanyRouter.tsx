
import { Routes, Route, Navigate } from "react-router-dom";
import { CompanyDashboardPage } from "./pages/Dashboard";
import { ShiftManagement } from "./pages/ShiftManagement";
import { StaffRequests } from "./pages/StaffRequests";
import { AgencyPartners } from "./pages/AgencyPartners";
import { StaffPool } from "./pages/StaffPool";
import { Invoices } from "./pages/Invoices";
import { CompanyReports } from "./pages/Reports";
import { Messages } from "./pages/Messages";
import { CompanySettings } from "./pages/Settings";

export function CompanyRouter() {
  return (
    <Routes>
      <Route index element={<CompanyDashboardPage />} />
      <Route path="shifts" element={<ShiftManagement />} />
      <Route path="staff-requests" element={<StaffRequests />} />
      <Route path="agencies" element={<AgencyPartners />} />
      <Route path="staff-pool" element={<StaffPool />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="reports" element={<CompanyReports />} />
      <Route path="messages" element={<Messages />} />
      <Route path="settings" element={<CompanySettings />} />
      <Route path="*" element={<Navigate to="/dashboard/company" replace />} />
    </Routes>
  );
}
