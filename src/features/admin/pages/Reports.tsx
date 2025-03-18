
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminReports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Admin reporting functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
