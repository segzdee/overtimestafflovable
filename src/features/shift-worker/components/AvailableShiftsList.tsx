
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, MapPin } from "lucide-react";
import { Shift } from "../types";

interface AvailableShiftsListProps {
  shifts: Shift[];
  onApplyShift: (shiftId: string) => void;
}

export function AvailableShiftsList({ shifts, onApplyShift }: AvailableShiftsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-600" />
          Available Shifts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shifts.map((shift) => (
            <div 
              key={shift.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
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
              </div>
              <Button 
                variant="outline"
                onClick={() => onApplyShift(shift.id)}
              >
                Apply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
