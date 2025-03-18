
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, MapPin, Clock, DollarSign, Calendar } from "lucide-react";

interface AvailableShift {
  id: number;
  company: string;
  date: string;
  time: string;
  role: string;
  pay: string;
}

interface AvailableShiftsTableProps {
  shifts: AvailableShift[];
  onApply: (shiftId: string) => void;
}

export const AvailableShiftsTable = ({ shifts, onApply }: AvailableShiftsTableProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b">
        <CardTitle className="text-lg font-medium">Available Shifts</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="default" size="sm" className="bg-primary text-white">View All</Button>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Company</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead>Pay</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts.map(shift => (
                <TableRow key={shift.id} className="hover:bg-gray-50">
                  <TableCell className="hidden sm:table-cell font-medium">
                    {shift.company}
                  </TableCell>
                  <TableCell>
                    <div className="sm:hidden font-medium mb-1">{shift.company}</div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm gap-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span>{shift.date}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{shift.time}</span>
                      </div>
                      <div className="md:hidden mt-1">
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {shift.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {shift.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center font-medium text-green-600 gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{shift.pay.replace('$', '')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={() => onApply(shift.id.toString())}
                    >
                      Apply
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
