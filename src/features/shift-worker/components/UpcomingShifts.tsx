
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Building } from "lucide-react";

interface UpcomingShift {
  id: number;
  company: string;
  date: string;
  time: string;
  role: string;
  pay: string;
}

interface UpcomingShiftsProps {
  shifts: UpcomingShift[];
}

export const UpcomingShifts = ({ shifts }: UpcomingShiftsProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b">
        <CardTitle className="text-lg font-medium">Upcoming Shifts</CardTitle>
        <Button variant="link" size="sm" className="text-sm text-primary">View All</Button>
      </CardHeader>
      <CardContent className="px-6 py-3">
        {shifts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="h-10 w-10 text-gray-300 mb-2" />
            <p className="text-gray-500">No upcoming shifts</p>
            <Button variant="link" className="mt-2 text-primary">Find new shifts</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {shifts.map(shift => (
              <div key={shift.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4 text-gray-500" />
                      <h3 className="font-medium">{shift.company}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{shift.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{shift.time}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {shift.role}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-green-600">{shift.pay}</span>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="text-xs">Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
