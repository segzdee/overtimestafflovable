import { useState } from "react";
import { 
  Calendar, 
  DollarSign, 
  User, 
  Users, 
  BarChart,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  PlusCircle,
  Clock,
  Building,
  FileText,
  Search,
  Filter,
  ChevronDown,
  Star,
  UserPlus,
  ClipboardList,
  TrendingUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AIAgentWidget from "@/components/AIAgentWidget";

export default function CompanyDashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart size={20} /> },
    { id: 'shifts', label: 'Shift Management', icon: <Calendar size={20} /> },
    { id: 'staff', label: 'Staff Requests', icon: <UserPlus size={20} /> },
    { id: 'agencies', label: 'Agency Partners', icon: <Briefcase size={20} /> },
    { id: 'staff-pool', label: 'Staff Pool', icon: <Users size={20} /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText size={20} /> },
    { id: 'reports', label: 'Reports', icon: <TrendingUp size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  const upcomingShifts = [
    { id: 1, position: 'Servers', date: 'Mar 4, 2025', time: '8:00 AM - 4:00 PM', location: 'Main Restaurant', staffNeeded: 5, staffConfirmed: 5, agency: 'Premier Staffing', status: 'Confirmed' },
    { id: 2, position: 'Bartenders', date: 'Mar 5, 2025', time: '5:00 PM - 11:00 PM', location: 'Rooftop Bar', staffNeeded: 3, staffConfirmed: 2, agency: 'Premier Staffing', status: 'Partial' },
    { id: 3, position: 'Event Staff', date: 'Mar 7, 2025', time: '2:00 PM - 10:00 PM', location: 'Conference Hall', staffNeeded: 8, staffConfirmed: 0, agency: 'Awaiting Agency', status: 'Pending' }
  ];

  const pendingRequests = [
    { id: 1, position: 'Housekeeping', date: 'Mar 10, 2025', time: '9:00 AM - 5:00 PM', staffNeeded: 6, status: 'Awaiting Responses', agencyResponses: 2 },
    { id: 2, position: 'Kitchen Staff', date: 'Mar 12, 2025', time: '6:00 AM - 2:00 PM', staffNeeded: 4, status: 'Awaiting Responses', agencyResponses: 1 }
  ];

  const favoriteStaff = [
    { id: 1, name: 'Emma Johnson', role: 'Bartender', shifts: 12, rating: 4.9, availability: 'Available Mar 15-20' },
    { id: 2, name: 'Michael Chen', role: 'Server', shifts: 8, rating: 4.8, availability: 'Available Mar 8-12' },
    { id: 3, name: 'Sophia Rodriguez', role: 'Event Staff', shifts: 6, rating: 4.7, availability: 'Available Weekends' }
  ];

  const topAgencies = [
    { id: 1, name: 'Premier Staffing Solutions', staffProvided: 24, reliability: '98%', responseTime: '< 1 hour' },
    { id: 2, name: 'Elite Hospitality Staff', staffProvided: 18, reliability: '95%', responseTime: '2 hours' },
    { id: 3, name: 'Quick Temp Solutions', staffProvided: 12, reliability: '92%', responseTime: '3 hours' }
  ];

  const recentInvoices = [
    { id: 1, agency: 'Premier Staffing', date: 'Feb 28, 2025', amount: '$2,450.00', shifts: 15, status: 'Paid' },
    { id: 2, agency: 'Elite Hospitality Staff', date: 'Feb 25, 2025', amount: '$1,840.00', shifts: 10, status: 'Processing' },
    { id: 3, agency: 'Quick Temp Solutions', date: 'Feb 20, 2025', amount: '$1,250.00', shifts: 8, status: 'Paid' }
  ];

  const handleCancelShift = async (shiftId: string) => {
    const hoursRemaining = 10; // Stub: Calculate dynamically post-MVP
    if (hoursRemaining < 12) {
      alert('Warning: 50% Cancellation Fee Applies');
    }
    alert('Shift Cancelled');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">OvertimeStaff</h1>
          <p className="text-gray-400 text-sm">Company Portal</p>
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
          <button 
            className="flex items-center w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-800 rounded"
            onClick={logout}
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-semibold">Company Dashboard</h1>
            <p className="text-sm text-gray-500">Grand Hotel & Resort</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                4
              </span>
            </div>
            <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
              {user?.name?.charAt(0) || "C"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Current Month Shifts</h2>
              <div className="flex items-center mt-2">
                <Calendar size={20} className="text-teal-600 mr-2" />
                <span className="text-2xl font-bold">28</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Staff Requested</h2>
              <div className="flex items-center mt-2">
                <Users size={20} className="text-blue-600 mr-2" />
                <span className="text-2xl font-bold">42</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Monthly Spend</h2>
              <div className="flex items-center mt-2">
                <DollarSign size={20} className="text-green-600 mr-2" />
                <span className="text-2xl font-bold">$8,450</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Pending Requests</h2>
              <div className="flex items-center mt-2">
                <ClipboardList size={20} className="text-orange-600 mr-2" />
                <span className="text-2xl font-bold">2</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Upcoming Shifts</h2>
                <button className="text-sm bg-teal-600 text-white px-3 py-1 rounded">
                  + Request New Shift
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingShifts.map(shift => (
                      <tr key={shift.id}>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{shift.position}</div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{shift.date}</div>
                          <div className="text-sm text-gray-500">{shift.time}</div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                          {shift.location}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900">{shift.staffConfirmed}/{shift.staffNeeded}</span>
                            <div className="w-16 h-2 bg-gray-200 rounded ml-2">
                              <div 
                                className={`h-2 rounded ${
                                  shift.staffConfirmed === shift.staffNeeded ? 'bg-green-500' : 
                                  shift.staffConfirmed > 0 ? 'bg-yellow-500' : 'bg-gray-200'
                                }`} 
                                style={{ width: `${(shift.staffConfirmed / shift.staffNeeded) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                          {shift.agency}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            shift.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                            shift.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {shift.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-right">
                          <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Pending Staff Requests</h2>
                <button className="text-sm text-teal-600">View All</button>
              </div>
              <div className="space-y-4">
                {pendingRequests.map(request => (
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
                        <Users size={14} className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{request.staffNeeded} needed</span>
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <button className="text-xs bg-teal-600 text-white px-2 py-1 rounded flex-1">
                          View Responses
                        </button>
                        <button className="text-xs border border-gray-300 text-gray-600 px-2 py-1 rounded">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full text-sm text-center text-teal-600 py-2 border border-dashed border-teal-300 rounded-lg hover:bg-teal-50">
                  + Create New Staff Request
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Favorite Staff</h2>
                <button className="text-sm text-teal-600">View All</button>
              </div>
              <div className="space-y-3">
                {favoriteStaff.map(staff => (
                  <div key={staff.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{staff.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {staff.role}
                          </span>
                          <div className="flex items-center ml-2 text-yellow-500">
                            <Star size={12} />
                            <span className="text-xs ml-1">{staff.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{staff.shifts} shifts completed</p>
                        <p className="text-xs text-green-600 mt-1">{staff.availability}</p>
                      </div>
                      <button className="text-xs bg-teal-600 text-white px-2 py-1 rounded">
                        Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Partner Agencies</h2>
                <button className="text-sm text-teal-600">View All</button>
              </div>
              <div className="space-y-3">
                {topAgencies.map(agency => (
                  <div key={agency.id} className="border-b pb-3 last:border-0">
                    <div>
                      <h3 className="font-medium">{agency.name}</h3>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Staff</div>
                          <div className="font-medium">{agency.staffProvided}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Reliability</div>
                          <div className="font-medium">{agency.reliability}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Response</div>
                          <div className="font-medium">{agency.responseTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full text-sm text-center text-teal-600 py-2 border border-dashed border-teal-300 rounded-lg hover:bg-teal-50">
                  + Find New Agencies
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Recent Invoices</h2>
                <button className="text-sm text-teal-600">View All</button>
              </div>
              <div className="space-y-3">
                {recentInvoices.map(invoice => (
                  <div key={invoice.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{invoice.agency}</h3>
                        <p className="text-sm text-gray-500">{invoice.date}</p>
                        <p className="text-xs text-gray-500 mt-1">{invoice.shifts} shifts</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{invoice.amount}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <AIAgentWidget userType="company" entityId={user?.id} />
    </div>
  );
}
