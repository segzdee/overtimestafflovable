
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Finance() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agency Finance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Financial Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Agency financial management dashboard for revenue tracking and invoicing.</p>
        </CardContent>
      </Card>
    </div>
  );
}
