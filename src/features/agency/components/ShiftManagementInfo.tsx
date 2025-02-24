
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ShiftManagementInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shift Worker Management</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          As an Agency, you can use this dashboard to:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
          <li>Register and manage shift workers</li>
          <li>Match workers with company needs</li>
          <li>Track worker availability and qualifications</li>
          <li>Process timesheets and payments</li>
          <li>View performance analytics</li>
          <li>Create and manage AI agents to assist with operations</li>
        </ul>
      </CardContent>
    </Card>
  );
}
