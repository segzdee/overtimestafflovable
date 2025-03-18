
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface Request {
  id: number;
  position: string;
  date: string;
  time: string;
  staffNeeded: number;
  status: string;
  agencyResponses: number;
}

interface PendingRequestsCardProps {
  requests: Request[];
}

export function PendingRequestsCard({ requests }: PendingRequestsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <CardTitle className="text-lg font-medium">Pending Staff Requests</CardTitle>
        <Button variant="link" size="sm" className="text-teal-600">View All</Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {requests.map(request => (
            <div key={request.id} className="border-b pb-4 last:border-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-medium">{request.position}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {request.agencyResponses} responses
                  </span>
                </div>
                <p className="text-sm text-gray-500">{request.date} • {request.time}</p>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{request.staffNeeded} needed</span>
                </div>
                <div className="mt-2 flex space-x-2">
                  <Button className="text-xs bg-teal-600 text-white px-2 py-1 rounded flex-1">
                    View Responses
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full text-sm text-center text-teal-600 py-2 border border-dashed border-teal-300 rounded-lg hover:bg-teal-50">
            + Create New Staff Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
