
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Messages() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Messaging System</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Messaging functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
