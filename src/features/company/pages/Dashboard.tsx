import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Building, 
  ClipboardList,
  TrendingUp
} from "lucide-react";
import { UpcomingShiftsTable } from "../components/UpcomingShiftsTable";
import { PendingRequestsCard } from "../components/PendingRequestsCard";
import { FavoriteStaffCard } from "../components/FavoriteStaffCard";
import { RecentInvoicesCard } from "../components/RecentInvoicesCard";

export function CompanyDashboardPage() {
  const { toast } = useToast();
  
  // Mock data
  const [upcomingShifts] = useState([
    { id: 1, position: 'Servers', date: 'Mar 4, 2025', time: '8:00 AM - 4:00 PM', location: 'Main Restaurant', staffNeeded: 5, staffConfirmed: 5, agency: 'Premier Staffing', status: 'Confirmed' },
    { id: 2, position: 'Bartenders', date: 'Mar 5, 2025', time: '5:00 PM - 11:00 PM', location: 'Rooftop Bar', staffNeeded: 3, staffConfirmed: 2, agency: 'Premier Staffing', status: 'Partial' },
    { id: 3, position: 'Event Staff', date: 'Mar 7, 2025', time: '2:00 PM - 10:00 PM', location: 'Conference Hall', staffNeeded: 8, staffConfirmed: 0, agency: 'Awaiting Agency', status: 'Pending' }
  ]);

  const [pendingRequests] = useState([
    { id: 1, position: 'Housekeeping', date: 'Mar 10, 2025', time: '9:00 AM - 5:00 PM', staffNeeded: 6, status: 'Awaiting Responses', agencyResponses: 2 },
    { id: 2, position: 'Kitchen Staff', date: 'Mar 12, 2025', time: '6:00 AM - 2:00 PM', staffNeeded: 4, status: 'Awaiting Responses', agencyResponses: 1 }
  ]);

  const [favoriteStaff] = useState([
    { id: 1, name: 'Emma Johnson', role: 'Bartender', shifts: 12, rating: 4.9, availability: 'Available Mar 15-20' },
    { id: 2, name: 'Michael Chen', role: 'Server', shifts: 8, rating: 4.8, availability: 'Available Mar 8-12' },
    { id: 3, name: 'Sophia Rodriguez', role: 'Event Staff', shifts: 6, rating: 4.7, availability: 'Available Weekends' }
  ]);

  const [recentInvoices] = useState([
    { id: 1, agency: 'Premier Staffing', date: 'Feb 28, 2025', hours: 15, amount: '$2,450.00', status: 'Paid' },
    { id: 2, agency: 'Elite Hospitality Staff', date: 'Feb 25, 2025', hours: 10, amount: '$1,840.00', status: 'Processing' },
    { id: 3, agency: 'Quick Temp Solutions', date: 'Feb 20, 2025', hours: 8, amount: '$1,250.00', status: 'Paid' }
  ]);

  const handleCancelShift = (shiftId: number) => {
    toast({
      title: "Shift Cancelled",
      description: `Shift #${shiftId} has been cancelled`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>View Schedule</span>
          </Button>
          <Button size="sm" className="bg-primary text-white flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Request Staff</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard 
          title="Current Month Shifts" 
          value="28" 
          icon={<Calendar className="h-5 w-5 text-teal-600" />} 
        />
        <StatsCard 
          title="Staff Requested" 
          value="42" 
          icon={<Users className="h-5 w-5 text-blue-600" />} 
        />
        <StatsCard 
          title="Monthly Spend" 
          value="$8,450" 
          icon={<DollarSign className="h-5 w-5 text-green-600" />} 
        />
        <StatsCard 
          title="Pending Requests" 
          value="2" 
          icon={<ClipboardList className="h-5 w-5 text-orange-600" />} 
        />
      </div>
      
      {/* Upcoming Shifts */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-lg font-medium">Upcoming Shifts</CardTitle>
          <Button className="text-sm bg-teal-600 text-white px-3 py-1 rounded">
            + Request New Shift
          </Button>
        </CardHeader>
        <CardContent className="px-4">
          <UpcomingShiftsTable shifts={upcomingShifts} onCancelShift={handleCancelShift} />
        </CardContent>
      </Card>
      
      {/* Other Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <PendingRequestsCard requests={pendingRequests} />
        <FavoriteStaffCard staff={favoriteStaff} />
        <RecentInvoicesCard invoices={recentInvoices} />
      </div>
      
      {/* Performance Monitoring */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-lg font-medium">Staffing Performance</CardTitle>
          <Button variant="outline" size="sm">View Details</Button>
        </CardHeader>
        <CardContent className="px-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">Staff Confirmation Rate</h3>
                <span className="text-sm text-gray-500">85%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded mt-2">
                <div className="h-2 bg-blue-500 rounded" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">Staff Punctuality</h3>
                <span className="text-sm text-gray-500">92%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded mt-2">
                <div className="h-2 bg-green-500 rounded" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">Cost Efficiency</h3>
                <span className="text-sm text-gray-500">78%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded mt-2">
                <div className="h-2 bg-teal-500 rounded" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">Guest Satisfaction</h3>
                <span className="text-sm text-gray-500">4.8/5.0</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded mt-2">
                <div className="h-2 bg-purple-500 rounded" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
