
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">Upcoming Shifts</CardTitle>
        <Button variant="link" size="sm" className="text-sm text-indigo-600">View All</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-3">
          {shifts.map(shift => (
            <div key={shift.id} className="border-b pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{shift.company}</h3>
                  <p className="text-sm text-gray-500">{shift.date} • {shift.time}</p>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mt-1 inline-block">
                    {shift.role}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-green-600">{shift.pay}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
