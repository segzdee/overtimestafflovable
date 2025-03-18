
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Finance() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Agency Finance</h1>
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle>Financial Management</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <p>Agency financial management dashboard for revenue tracking and invoicing.</p>
        </CardContent>
      </Card>
    </div>
  );
}
