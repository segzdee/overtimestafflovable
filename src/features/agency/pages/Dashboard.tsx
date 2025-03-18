
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { 
  Calendar, 
  Users, 
  Building2, 
  DollarSign, 
  Briefcase,
  Clock
} from "lucide-react";
import { AgencyStaffTable } from "../components/AgencyStaffTable";
import { ActiveShiftsCard } from "../components/ActiveShiftsCard";
import { TopClientsCard } from "../components/TopClientsCard";
import { RevenueChart } from "../components/RevenueChart";

export function AgencyDashboardPage() {
  // Mock data
  const [agencyStaff] = useState([
    { id: 1, name: 'Emma Johnson', role: 'Bartender', status: 'On Shift', rating: 4.9, shifts: 18, revenue: '$2,340' },
    { id: 2, name: 'Michael Smith', role: 'Server', status: 'Available', rating: 4.7, shifts: 12, revenue: '$1,560' },
    { id: 3, name: 'Sarah Williams', role: 'Host', status: 'On Shift', rating: 4.8, shifts: 15, revenue: '$1,950' },
    { id: 4, name: 'James Brown', role: 'Bartender', status: 'Available', rating: 4.6, shifts: 10, revenue: '$1,300' },
    { id: 5, name: 'Jessica Lee', role: 'Event Staff', status: 'Unavailable', rating: 4.5, shifts: 8, revenue: '$1,040' }
  ]);

  const [activeShifts] = useState([
    { id: 1, company: 'Grand Hotel', position: 'Bartenders', date: 'Today', time: '5:00 PM - 11:00 PM', workers: 3, status: 'In Progress' },
    { id: 2, company: 'Luxury Resort', position: 'Servers', date: 'Today', time: '8:00 AM - 4:00 PM', workers: 5, status: 'In Progress' },
    { id: 3, company: 'City Convention', position: 'Event Staff', date: 'Tomorrow', time: '9:00 AM - 5:00 PM', workers: 8, status: 'Confirmed' }
  ]);

  const [topClients] = useState([
    { id: 1, name: 'Grand Hotel', shiftsThisMonth: 24, totalRevenue: '$8,400', lastShift: '2 hours ago' },
    { id: 2, name: 'Luxury Resort', shiftsThisMonth: 18, totalRevenue: '$6,300', lastShift: 'Yesterday' },
    { id: 3, name: 'City Convention', shiftsThisMonth: 12, totalRevenue: '$4,200', lastShift: '3 days ago' }
  ]);

  const handleViewStaffProfile = (staffId: number) => {
    console.log(`View staff profile for ID: ${staffId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Agency Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Worker Management</span>
          </Button>
          <Button size="sm" className="bg-primary text-white flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span>Client Management</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Active Workers" 
          value="42" 
          icon={<Users className="h-5 w-5 text-blue-600" />} 
          trend={{ value: "+8% this month", positive: true }}
        />
        <StatsCard 
          title="Clients" 
          value="12" 
          icon={<Building2 className="h-5 w-5 text-purple-600" />} 
          trend={{ value: "+2 new", positive: true }}
        />
        <StatsCard 
          title="Monthly Revenue" 
          value="$24,500" 
          icon={<DollarSign className="h-5 w-5 text-green-600" />} 
          trend={{ value: "+18% vs last month", positive: true }}
        />
        <StatsCard 
          title="Shifts This Month" 
          value="68" 
          icon={<Calendar className="h-5 w-5 text-teal-600" />} 
          trend={{ value: "12 scheduled", positive: true }}
        />
      </div>
      
      {/* Staff Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
          <CardTitle className="text-lg font-medium">Worker Roster</CardTitle>
          <Button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
            + Add Worker
          </Button>
        </CardHeader>
        <CardContent className="px-6">
          <AgencyStaffTable staff={agencyStaff} onViewProfile={handleViewStaffProfile} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ActiveShiftsCard shifts={activeShifts} />
        <TopClientsCard clients={topClients} />
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
            <CardTitle className="text-lg font-medium">Staff Status</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent className="px-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">On Shift</h3>
                  <div className="flex items-center mt-1 text-green-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">18 workers</span>
                  </div>
                </div>
                <div className="text-2xl font-bold">42%</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Available</h3>
                  <div className="flex items-center mt-1 text-blue-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">15 workers</span>
                  </div>
                </div>
                <div className="text-2xl font-bold">36%</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Unavailable</h3>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">9 workers</span>
                  </div>
                </div>
                <div className="text-2xl font-bold">22%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Revenue Chart */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
          <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">Monthly</Button>
            <Button variant="outline" size="sm" className="text-xs">Quarterly</Button>
            <Button variant="outline" size="sm" className="text-xs bg-blue-50">Annual</Button>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <RevenueChart />
        </CardContent>
      </Card>
    </div>
  );
}
