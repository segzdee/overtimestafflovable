
import { Routes, Route, Navigate } from "react-router-dom";
import { AgencyDashboardPage } from "./pages/Dashboard";
import { WorkerRoster } from "./pages/WorkerRoster";
import { AgencyClients } from "./pages/Clients";
import { ShiftManagement } from "./pages/ShiftManagement";
import { Finance } from "./pages/Finance";
import { Announcements } from "./pages/Announcements";
import { AgencySettings } from "./pages/Settings";

export function AgencyRouter() {
  return (
    <Routes>
      <Route index element={<AgencyDashboardPage />} />
      <Route path="workers" element={<WorkerRoster />} />
      <Route path="clients" element={<AgencyClients />} />
      <Route path="shifts" element={<ShiftManagement />} />
      <Route path="finance" element={<Finance />} />
      <Route path="announcements" element={<Announcements />} />
      <Route path="settings" element={<AgencySettings />} />
      <Route path="*" element={<Navigate to="/dashboard/agency" replace />} />
    </Routes>
  );
}
