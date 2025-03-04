
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  User, 
  Users, 
  BarChart,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  CheckCircle2,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shift } from "@/features/shift-worker/types";

export default function ShiftWorkerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [badges] = useState(['Top Performer', 'Reliable', 'Experienced']);
  const [preferences] = useState({
    location: 'NY',
    pay_rate: 20
  });
  
  const [recentShifts] = useState<Shift[]>([
    { id: '1', title: 'Evening Server', pay_rate: 25, location: 'Manhattan', status: 'open' },
    { id: '2', title: 'Bartender', pay_rate: 30, location: 'Brooklyn', status: 'open' }
  ]);
  
  const [urgentShifts] = useState<Shift[]>([
    { 
      id: '3', 
      title: 'Kitchen Staff', 
      pay_rate: 28, 
      location: 'Queens', 
      remaining_time: '2 hours', 
      status: 'emergency' 
    }
  ]);

  const [weeklyProgress] = useState({
    current: 24,
    target: 40,
    percentage: 60
  });

  const [recentActivity] = useState([
    { date: '2023-06-15', event: 'Completed shift at Downtown Restaurant', amount: 120 },
    { date: '2023-06-14', event: 'Applied to Evening Bartender shift', amount: null },
    { date: '2023-06-12', event: 'Completed shift at Midtown Cafe', amount: 105 }
  ]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart size={20} /> },
    { id: 'shifts', label: 'My Shifts', icon: <Calendar size={20} /> },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'companies', label: 'Companies', icon: <Briefcase size={20} /> },
    { id: 'teams', label: 'Teams', icon: <Users size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  const upcomingShifts = [
    { id: 1, company: 'Grand Hotel', date: 'Mar 4, 2025', time: '8:00 AM - 4:00 PM', role: 'Server', pay: '$140' },
    { id: 2, company: 'City Bistro', date: 'Mar 5, 2025', time: '5:00 PM - 11:00 PM', role: 'Bartender', pay: '$130' },
    { id: 3, company: 'Event Center', date: 'Mar 7, 2025', time: '2:00 PM - 10:00 PM', role: 'Host', pay: '$125' }
  ];

  const availableShifts = [
    { id: 1, company: 'Seafood Palace', date: 'Mar 8, 2025', time: '11:00 AM - 7:00 PM', role: 'Server', pay: '$135' },
    { id: 2, company: 'Downtown Bar', date: 'Mar 9, 2025', time: '8:00 PM - 2:00 AM', role: 'Bartender', pay: '$160' },
    { id: 3, company: 'Luxury Hotel', date: 'Mar 10, 2025', time: '7:00 AM - 3:00 PM', role: 'Housekeeper', pay: '$120' },
    { id: 4, company: 'Conference Center', date: 'Mar 12, 2025', time: '9:00 AM - 5:00 PM', role: 'Event Staff', pay: '$140' }
  ];

  const recentEarnings = [
    { id: 1, company: 'Beach Resort', date: 'Mar 1, 2025', hours: 8, amount: '$144.00', status: 'Paid' },
    { id: 2, company: 'Italian Restaurant', date: 'Feb 28, 2025', hours: 6, amount: '$108.00', status: 'Paid' },
    { id: 3, company: 'Downtown Hotel', date: 'Feb 25, 2025', hours: 8, amount: '$144.00', status: 'Paid' }
  ];

  const notifications = [
    { id: 1, text: 'New shift available at Grand Hotel', time: '10 min ago' },
    { id: 2, text: 'Your payment of $144.00 has been processed', time: '1 hour ago' },
    { id: 3, text: 'Shift confirmation for tomorrow at City Bistro', time: '3 hours ago' }
  ];

  const handleApplyShift = async (shiftId: string) => {
    alert(`Applied to shift ${shiftId}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 hover:bg-gray-200">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-bold">OvertimeStaff</h1>
        <div className="relative">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            3
          </span>
        </div>
      </div>

      {/* Sidebar - Responsive */}
      <div className={`fixed inset-y-0 left-0 z-30 transform md:relative md:translate-x-0 transition duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:flex md:flex-col w-64 bg-gray-900 text-white`}>
        <div className="p-4 border-b border-gray-700 hidden md:block">
          <h1 className="text-xl font-bold">OvertimeStaff</h1>
          <p className="text-gray-400 text-sm">Shift Worker Portal</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="mt-2">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeTab === item.id ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
              >
                <span className="mr-3 text-gray-400">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-800 rounded">
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="bg-white shadow-sm hidden md:flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Alex</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                3
              </span>
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              A
            </div>
          </div>
        </header>

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium text-gray-500">This Week's Hours</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center mb-2">
                  <Clock size={20} className="text-indigo-600 mr-2" />
                  <span className="text-2xl font-bold">{weeklyProgress.current}</span>
                  <span className="ml-1 text-sm text-gray-500">/ {weeklyProgress.target} hrs</span>
                </div>
                <Progress value={weeklyProgress.percentage} className="h-2" indicatorClassName="bg-indigo-600" />
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium text-gray-500">Weekly Earnings</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center">
                  <DollarSign size={20} className="text-green-600 mr-2" />
                  <span className="text-2xl font-bold">$405.00</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium text-gray-500">Available Shifts</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center">
                  <Calendar size={20} className="text-blue-600 mr-2" />
                  <span className="text-2xl font-bold">{availableShifts.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two-column layout for medium and large screens, stack on small */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Upcoming Shifts */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">Upcoming Shifts</CardTitle>
                <Button variant="link" size="sm" className="text-sm text-indigo-600">View All</Button>
              </CardHeader>
              <CardContent className="px-6">
                <div className="space-y-3">
                  {upcomingShifts.map(shift => (
                    <div key={shift.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{shift.company}</h3>
                          <p className="text-sm text-gray-500">{shift.date} • {shift.time}</p>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mt-1 inline-block">
                            {shift.role}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-green-600">{shift.pay}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Earnings */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">Recent Earnings</CardTitle>
                <Button variant="link" size="sm" className="text-sm text-indigo-600">View All</Button>
              </CardHeader>
              <CardContent className="px-6">
                <div className="space-y-3">
                  {recentEarnings.map(earning => (
                    <div key={earning.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{earning.company}</h3>
                          <p className="text-sm text-gray-500">{earning.date} • {earning.hours} hrs</p>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-green-600">{earning.amount}</span>
                          <p className="text-xs text-gray-500">{earning.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Shifts Table - Responsive */}
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
                    {availableShifts.map(shift => (
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
                            onClick={() => handleApplyShift(shift.id.toString())}
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
        </main>
      </div>
    </div>
  );
}
