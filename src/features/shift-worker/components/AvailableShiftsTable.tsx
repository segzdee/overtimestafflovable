
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">Available Shifts</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" className="bg-indigo-600 text-white">Filter</Button>
          <Button variant="outline" size="sm" className="text-indigo-600">View All</Button>
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
                <TableRow key={shift.id}>
                  <TableCell className="hidden sm:table-cell font-medium">
                    {shift.company}
                  </TableCell>
                  <TableCell>
                    <div className="sm:hidden font-medium mb-1">{shift.company}</div>
                    <div>
                      <div className="text-sm">{shift.date}</div>
                      <div className="text-xs text-gray-500">{shift.time}</div>
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
                  <TableCell className="font-medium text-green-600">
                    {shift.pay}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
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
