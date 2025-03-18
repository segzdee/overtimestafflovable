
import { DashboardLayout } from "@/components/DashboardLayout";
import { CompanyRouter } from "@/features/company/CompanyRouter";

export default function CompanyDashboard() {
  return (
    <DashboardLayout>
      <CompanyRouter />
    </DashboardLayout>
  );
}
