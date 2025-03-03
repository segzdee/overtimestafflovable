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
  CheckCircle2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shift } from "@/features/shift-worker/types";

export default function ShiftWorkerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
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

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">OvertimeStaff</h1>
          <p className="text-gray-400 text-sm">Shift Worker Portal</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-2">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeTab === item.id ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
                onClick={() => setActiveTab(item.id)}
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm flex items-center justify-between p-4">
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

        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">This Week's Hours</h2>
              <div className="flex items-center mt-2">
                <Clock size={20} className="text-indigo-600 mr-2" />
                <span className="text-2xl font-bold">{weeklyProgress.current}</span>
                <span className="ml-1 text-sm text-gray-500">/ {weeklyProgress.target} hrs</span>
              </div>
              <div className="mt-2">
                <Progress value={weeklyProgress.percentage} className="h-2" indicatorClassName="bg-indigo-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Weekly Earnings</h2>
              <div className="flex items-center mt-2">
                <DollarSign size={20} className="text-green-600 mr-2" />
                <span className="text-2xl font-bold">$405.00</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Available Shifts</h2>
              <div className="flex items-center mt-2">
                <Calendar size={20} className="text-blue-600 mr-2" />
                <span className="text-2xl font-bold">{availableShifts.length}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Upcoming Shifts</h2>
                <button className="text-sm text-indigo-600">View All</button>
              </div>
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
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Recent Earnings</h2>
                <button className="text-sm text-indigo-600">View All</button>
              </div>
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
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Available Shifts</h2>
              <div>
                <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded mr-2">Filter</button>
                <button className="text-sm text-indigo-600">View All</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {availableShifts.map(shift => (
                    <tr key={shift.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{shift.company}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shift.date}</div>
                        <div className="text-sm text-gray-500">{shift.time}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {shift.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600">
                        {shift.pay}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <button 
                          className="text-xs bg-indigo-600 text-white px-3 py-1 rounded"
                          onClick={() => handleApplyShift(shift.id.toString())}
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
