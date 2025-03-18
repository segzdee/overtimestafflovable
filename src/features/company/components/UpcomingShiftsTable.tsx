
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Shift {
  id: number;
  position: string;
  date: string;
  time: string;
  location: string;
  staffNeeded: number;
  staffConfirmed: number;
  agency: string;
  status: string;
}

interface UpcomingShiftsTableProps {
  shifts: Shift[];
  onCancelShift: (shiftId: number) => void;
}

export function UpcomingShiftsTable({ shifts, onCancelShift }: UpcomingShiftsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead className="hidden md:table-cell">Location</TableHead>
            <TableHead>Staff</TableHead>
            <TableHead className="hidden md:table-cell">Agency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shifts.map(shift => (
            <TableRow key={shift.id}>
              <TableCell className="font-medium">{shift.position}</TableCell>
              <TableCell>
                <div className="text-sm">{shift.date}</div>
                <div className="text-xs text-gray-500">{shift.time}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{shift.location}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="text-sm mr-2">{shift.staffConfirmed}/{shift.staffNeeded}</span>
                  <div className="w-16 h-2 bg-gray-200 rounded">
                    <div 
                      className={`h-2 rounded ${
                        shift.staffConfirmed === shift.staffNeeded ? 'bg-green-500' : 
                        shift.staffConfirmed > 0 ? 'bg-yellow-500' : 'bg-gray-200'
                      }`} 
                      style={{ width: `${(shift.staffConfirmed / shift.staffNeeded) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{shift.agency}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  shift.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                  shift.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {shift.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCancelShift(shift.id)}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
