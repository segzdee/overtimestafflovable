
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, CalendarDays, DollarSign, Clock } from "lucide-react";

interface Client {
  id: number;
  name: string;
  shiftsThisMonth: number;
  totalRevenue: string;
  lastShift: string;
}

interface TopClientsCardProps {
  clients: Client[];
}

export function TopClientsCard({ clients }: TopClientsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">Top Clients</CardTitle>
        <Button variant="link" size="sm" className="text-blue-600">View All</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {clients.map(client => (
            <div key={client.id} className="border-b pb-4 last:border-0">
              <div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 text-gray-500 mr-2" />
                  <h3 className="font-medium">{client.name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center text-gray-500 text-xs">
                    <CalendarDays className="h-3.5 w-3.5 mr-1" />
                    <span>{client.shiftsThisMonth} shifts</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                    <span>{client.totalRevenue}</span>
                  </div>
                </div>
                <div className="flex items-center mt-1 text-gray-500 text-xs">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Last shift: {client.lastShift}</span>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="text-xs">
                  View Client
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
