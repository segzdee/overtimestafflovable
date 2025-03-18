
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SystemPerformance {
  cpu: number;
  memory: number;
  database: number;
  api: number;
}

interface SystemPerformanceCardProps {
  performance: SystemPerformance;
}

export function SystemPerformanceCard({ performance }: SystemPerformanceCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">System Performance</CardTitle>
        <Button variant="link" size="sm" className="text-blue-600">View Details</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Server CPU Load</h3>
              <span className="text-sm text-gray-500">{performance.cpu}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div className="h-2 bg-blue-500 rounded" style={{ width: `${performance.cpu}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Memory Usage</h3>
              <span className="text-sm text-gray-500">{performance.memory}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div className="h-2 bg-yellow-500 rounded" style={{ width: `${performance.memory}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Database Load</h3>
              <span className="text-sm text-gray-500">{performance.database}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div className="h-2 bg-red-500 rounded" style={{ width: `${performance.database}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">API Response Time</h3>
              <span className="text-sm text-gray-500">{performance.api}ms</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div className="h-2 bg-green-500 rounded" style={{ width: `${performance.api}%` }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
