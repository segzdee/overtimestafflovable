
import { DashboardLayout } from "@/components/DashboardLayout";
import { AdminRouter } from "@/features/admin/AdminRouter";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <AdminRouter />
    </DashboardLayout>
  );
}
