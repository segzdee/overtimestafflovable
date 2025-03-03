
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
    <Card className="bg-gray-800/60 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Clock className="h-5 w-5 text-primary" />
          Available Shifts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-400">Position</TableHead>
              <TableHead className="text-gray-400">Location</TableHead>
              <TableHead className="text-gray-400">Pay Rate</TableHead>
              <TableHead className="text-right text-gray-400">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.id} className="border-gray-700">
                <TableCell className="font-medium text-white">{shift.title}</TableCell>
                <TableCell className="text-gray-300">{shift.location}</TableCell>
                <TableCell className="text-gray-300">${shift.pay_rate}/hr</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-primary hover:bg-primary hover:text-white"
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
