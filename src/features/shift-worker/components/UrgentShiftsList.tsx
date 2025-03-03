
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, DollarSign, MapPin, Clock } from "lucide-react";
import { Shift } from "../types";

interface UrgentShiftsListProps {
  shifts: Shift[];
  onApplyShift: (shiftId: string) => void;
}

export function UrgentShiftsList({ shifts, onApplyShift }: UrgentShiftsListProps) {
  return (
    <Card className="border-red-100">
      <CardHeader className="bg-red-50 rounded-t-lg border-b border-red-100">
        <CardTitle className="flex items-center gap-2 text-xl text-red-700">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Urgent Shifts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          {shifts.map((shift) => (
            <div 
              key={shift.id}
              className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
            >
              <div>
                <h3 className="font-medium text-red-900">{shift.title}</h3>
                <div className="flex items-center gap-2 text-sm text-red-700 mt-1">
                  <DollarSign className="h-4 w-4" />
                  ${shift.pay_rate}/hr
                  <span className="mx-1">•</span>
                  <MapPin className="h-4 w-4" />
                  {shift.location}
                </div>
                {shift.remaining_time && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-red-800">
                    <Clock className="h-4 w-4" />
                    Only {shift.remaining_time} left to apply
                  </div>
                )}
              </div>
              <Button 
                variant="destructive"
                onClick={() => onApplyShift(shift.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Apply Now
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
