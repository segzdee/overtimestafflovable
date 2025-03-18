
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminReports() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Reports</h1>
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle>System Reports</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <p>Admin reporting and analytics dashboard for system-wide metrics.</p>
        </CardContent>
      </Card>
    </div>
  );
}
