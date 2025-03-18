
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Finance() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Finance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Financial Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Financial management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
