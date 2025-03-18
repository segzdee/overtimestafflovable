
import { DashboardLayout } from "@/components/DashboardLayout";
import { AgencyRouter } from "@/features/agency/AgencyRouter";

export default function AgencyDashboard() {
  return (
    <DashboardLayout>
      <AgencyRouter />
    </DashboardLayout>
  );
}
