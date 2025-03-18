
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CompanyReports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Company Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Business Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Company reporting functionality for staffing and shift metrics.</p>
        </CardContent>
      </Card>
    </div>
  );
}
