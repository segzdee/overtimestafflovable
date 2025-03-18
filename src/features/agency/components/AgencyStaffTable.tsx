
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  status: string;
  rating: number;
  shifts: number;
  revenue: string;
}

interface AgencyStaffTableProps {
  staff: StaffMember[];
  onViewProfile: (staffId: number) => void;
}

export function AgencyStaffTable({ staff, onViewProfile }: AgencyStaffTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Rating</TableHead>
            <TableHead className="hidden md:table-cell">Shifts</TableHead>
            <TableHead className="hidden md:table-cell">Revenue</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map(member => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>
                <Badge className={`
                  ${member.status === 'On Shift' ? 'bg-green-100 text-green-800' : 
                    member.status === 'Available' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}
                `}>
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{member.rating}/5.0</TableCell>
              <TableCell className="hidden md:table-cell">{member.shifts}</TableCell>
              <TableCell className="hidden md:table-cell">{member.revenue}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewProfile(member.id)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
