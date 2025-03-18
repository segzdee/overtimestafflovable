
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>System settings functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
