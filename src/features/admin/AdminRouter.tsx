
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminDashboardPage } from "./pages/Dashboard";
import { UserManagement } from "./pages/UserManagement";
import { Organizations } from "./pages/Organizations";
import { AdminReports } from "./pages/Reports";
import { SystemAlerts } from "./pages/SystemAlerts";
import { AdminSettings } from "./pages/Settings";

export function AdminRouter() {
  return (
    <Routes>
      <Route index element={<AdminDashboardPage />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="organizations" element={<Organizations />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="alerts" element={<SystemAlerts />} />
      <Route path="settings" element={<AdminSettings />} />
      <Route path="*" element={<Navigate to="/dashboard/admin" replace />} />
    </Routes>
  );
}
