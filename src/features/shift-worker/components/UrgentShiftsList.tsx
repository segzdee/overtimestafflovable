
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, DollarSign, MapPin } from "lucide-react";
import { Shift } from "../types";

interface UrgentShiftsListProps {
  shifts: Shift[];
  onApplyShift: (shiftId: string) => void;
}

export function UrgentShiftsList({ shifts, onApplyShift }: UrgentShiftsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Urgent Shifts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shifts.map((shift) => (
            <div 
              key={shift.id}
              className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50"
            >
              <div>
                <h3 className="font-medium">{shift.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  ${shift.pay_rate}/hr
                  <span className="mx-1">•</span>
                  <MapPin className="h-4 w-4" />
                  {shift.location}
                </div>
                {shift.remaining_time && (
                  <Badge variant="destructive" className="mt-2">
                    {shift.remaining_time} left to apply
                  </Badge>
                )}
              </div>
              <Button 
                variant="destructive"
                onClick={() => onApplyShift(shift.id)}
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
