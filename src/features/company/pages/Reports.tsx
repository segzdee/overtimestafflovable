
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CompanyReports() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Company Reports</h1>
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle>Business Analytics</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <p>Company reporting functionality for staffing and shift metrics.</p>
        </CardContent>
      </Card>
    </div>
  );
}
