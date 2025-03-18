
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  company: string | null;
  date: string;
}

interface RecentUsersTableProps {
  users: User[];
  onViewUser: (userId: number) => void;
}

export function RecentUsersTable({ users, onViewUser }: RecentUsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.name}
                {user.company && (
                  <div className="text-xs text-gray-500">{user.company}</div>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">{user.email}</TableCell>
              <TableCell>
                <Badge className={`
                  ${user.role === 'Company' ? 'bg-teal-100 text-teal-800' : 
                    user.role === 'Agency' ? 'bg-purple-100 text-purple-800' : 
                    'bg-blue-100 text-blue-800'}
                `}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{user.date}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewUser(user.id)}
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
