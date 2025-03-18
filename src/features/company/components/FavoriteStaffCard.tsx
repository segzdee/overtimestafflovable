
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  shifts: number;
  rating: number;
  availability: string;
}

interface FavoriteStaffCardProps {
  staff: StaffMember[];
}

export function FavoriteStaffCard({ staff }: FavoriteStaffCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">Favorite Staff</CardTitle>
        <Button variant="link" size="sm" className="text-teal-600">View All</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-3">
          {staff.map(member => (
            <div key={member.id} className="border-b pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {member.role}
                    </span>
                    <div className="flex items-center ml-2 text-yellow-500">
                      <span className="text-xs ml-1">{member.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{member.shifts} shifts completed</p>
                  <p className="text-xs text-green-600 mt-1">{member.availability}</p>
                </div>
                <Button size="sm" className="text-xs bg-teal-600 text-white px-2 py-1 rounded">
                  Request
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
