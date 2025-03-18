
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Invoices() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Invoices</h1>
      <Card>
        <CardHeader>
          <CardTitle>Invoice Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Invoice management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
