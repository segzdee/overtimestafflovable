
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminReports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Admin reporting and analytics dashboard for system-wide metrics.</p>
        </CardContent>
      </Card>
    </div>
  );
}
