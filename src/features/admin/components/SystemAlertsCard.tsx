
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Alert {
  id: number;
  type: string;
  message: string;
  date: string;
  time: string;
  priority: string;
}

interface SystemAlertsCardProps {
  alerts: Alert[];
  onResolveAlert: (alertId: number) => void;
}

export function SystemAlertsCard({ alerts, onResolveAlert }: SystemAlertsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">System Alerts</CardTitle>
        <Button variant="link" size="sm" className="text-blue-600">View All Alerts</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className="border-b pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.type === 'Error' ? 'bg-red-100 text-red-800' : 
                      alert.type === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.type}
                    </span>
                    <span className={`ml-2 text-xs ${
                      alert.priority === 'High' ? 'text-red-600' : 
                      alert.priority === 'Medium' ? 'text-yellow-600' :
                      'text-gray-500'
                    }`}>
                      {alert.priority} Priority
                    </span>
                  </div>
                  <h3 className="font-medium mt-1">{alert.message}</h3>
                  <p className="text-xs text-gray-500 mt-1">{alert.date} at {alert.time}</p>
                </div>
                <Button 
                  size="sm"
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => onResolveAlert(alert.id)}
                >
                  Resolve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
