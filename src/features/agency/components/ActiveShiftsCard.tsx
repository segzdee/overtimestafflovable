
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";

interface Shift {
  id: number;
  company: string;
  position: string;
  date: string;
  time: string;
  workers: number;
  status: string;
}

interface ActiveShiftsCardProps {
  shifts: Shift[];
}

export function ActiveShiftsCard({ shifts }: ActiveShiftsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">Active Shifts</CardTitle>
        <Button variant="link" size="sm" className="text-blue-600">View All</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {shifts.map(shift => (
            <div key={shift.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{shift.company}</h3>
                  <p className="text-sm text-gray-500">{shift.position}</p>
                  <div className="flex items-center mt-2 gap-3">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {shift.date}
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {shift.time}
                    </div>
                  </div>
                  <div className="flex items-center mt-1 text-gray-500 text-xs">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    {shift.workers} workers assigned
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    shift.status === 'In Progress' ? 'bg-green-100 text-green-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {shift.status}
                  </span>
                  <Button variant="outline" size="sm" className="mt-2 text-xs">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
