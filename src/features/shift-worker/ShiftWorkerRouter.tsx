
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ShiftWorkerDashboard } from "./pages/Dashboard";
import { MyShifts } from "./pages/MyShifts";
import { MyEarnings } from "./pages/MyEarnings";
import { WorkerProfile } from "./pages/WorkerProfile";
import { Companies } from "./pages/Companies";
import { Teams } from "./pages/Teams";
import { Messages } from "./pages/Messages";
import { Settings } from "./pages/Settings";

export function ShiftWorkerRouter() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<ShiftWorkerDashboard />} />
        <Route path="/shifts" element={<MyShifts />} />
        <Route path="/earnings" element={<MyEarnings />} />
        <Route path="/profile" element={<WorkerProfile />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard/shift-worker" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
