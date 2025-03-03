
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, MapPin } from "lucide-react";
import { Shift } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AvailableShiftsListProps {
  shifts: Shift[];
  onApplyShift: (shiftId: string) => void;
}

export function AvailableShiftsList({ shifts, onApplyShift }: AvailableShiftsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Clock className="h-5 w-5 text-primary" />
          Available Shifts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Pay Rate</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell className="font-medium">{shift.title}</TableCell>
                <TableCell>{shift.location}</TableCell>
                <TableCell>${shift.pay_rate}/hr</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => onApplyShift(shift.id)}
                  >
                    Apply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
