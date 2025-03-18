
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AgencyClients() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agency Clients</h1>
      <Card>
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage client relationships and client-specific staffing requirements.</p>
        </CardContent>
      </Card>
    </div>
  );
}
