
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
  CheckCircle,
  Clock,
  Building,
  FileText,
  Search,
  Filter,
  ChevronDown,
  Building2,
  Activity
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AgencyDashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isActivatingAI, setIsActivatingAI] = useState(false);
  
  // Sidebar items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart size={20} /> },
    { id: 'staff', label: 'Staff Management', icon: <Users size={20} /> },
    { id: 'shifts', label: 'Shift Management', icon: <Calendar size={20} /> },
    { id: 'clients', label: 'Client Companies', icon: <Building size={20} /> },
    { id: 'invoices', label: 'Invoices & Billing', icon: <FileText size={20} /> },
    { id: 'earnings', label: 'Revenue', icon: <DollarSign size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  // Mock data
  const pendingApprovals = [
    { id: 1, name: 'Emma Johnson', role: 'Bartender', experience: '3 years', rating: 4.8, availability: 'Weekends, Evenings' },
    { id: 2, name: 'Michael Chen', role: 'Server', experience: '2 years', rating: 4.5, availability: 'Mon-Fri, Evenings' },
    { id: 3, name: 'Sophia Rodriguez', role: 'Event Staff', experience: '1 year', rating: 4.2, availability: 'Weekends' }
  ];

  const activeShifts = [
    { id: 1, client: 'Grand Hotel', date: 'Mar 4, 2025', time: '8:00 AM - 4:00 PM', staffNeeded: 5, staffAssigned: 3, status: 'Filling' },
    { id: 2, name: 'City Bistro', date: 'Mar 5, 2025', time: '5:00 PM - 11:00 PM', staffNeeded: 4, staffAssigned: 4, status: 'Filled' },
    { id: 3, name: 'Event Center', date: 'Mar 7, 2025', time: '2:00 PM - 10:00 PM', staffNeeded: 8, staffAssigned: 6, status: 'Filling' }
  ];

  const topClients = [
    { id: 1, name: 'Grand Hotel', shiftsThisMonth: 24, value: '$4,320', relationship: '2 years' },
    { id: 2, name: 'City Bistro Group', shiftsThisMonth: 18, value: '$3,240', relationship: '1 year' },
    { id: 3, name: 'Downtown Event Center', shiftsThisMonth: 12, value: '$2,880', relationship: '6 months' },
    { id: 4, name: 'Luxury Resort', shiftsThisMonth: 10, value: '$2,400', relationship: '3 years' }
  ];

  const topPerformers = [
    { id: 1, name: 'James Wilson', shifts: 15, rating: 4.9, earnings: '$2,700' },
    { id: 2, name: 'Ava Martinez', shifts: 12, rating: 4.8, earnings: '$2,160' },
    { id: 3, name: 'Thomas Lee', shifts: 10, rating: 4.7, earnings: '$1,800' },
    { id: 4, name: 'Olivia Brown', shifts: 9, rating: 4.8, earnings: '$1,620' }
  ];

  const staffRequests = [
    { id: 1, client: 'Beach Resort', date: 'Mar 10, 2025', positions: 'Servers (3), Bartenders (2)', urgency: 'High', status: 'New Request' },
    { id: 2, client: 'Corporate Event', date: 'Mar 15, 2025', positions: 'Event Staff (10)', urgency: 'Medium', status: 'New Request' }
  ];

  const handleActivateAI = async () => {
    setIsActivatingAI(true);
    try {
      toast({
        title: "AI Agent Activated",
        description: "Your AI agent has been successfully activated.",
      });
    } catch (error) {
      toast({
        title: "Activation Failed",
        description: "Failed to activate AI agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActivatingAI(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">OvertimeStaff</h1>
          <p className="text-gray-400 text-sm">Agency Portal</p>
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
            onClick={() => logout()}
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-semibold">Agency Dashboard</h1>
            <p className="text-sm text-gray-500">Premier Staffing Solutions</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleActivateAI}
              disabled={isActivatingAI}
              className="bg-primary text-white flex items-center gap-2"
            >
              {isActivatingAI ? "Activating..." : "AI Assistant"}
            </Button>
            <div className="relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                5
              </span>
            </div>
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
              {user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Active Staff</h2>
              <div className="flex items-center mt-2">
                <Users size={20} className="text-purple-600 mr-2" />
                <span className="text-2xl font-bold">48</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Active Shifts</h2>
              <div className="flex items-center mt-2">
                <Calendar size={20} className="text-blue-600 mr-2" />
                <span className="text-2xl font-bold">12</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Monthly Revenue</h2>
              <div className="flex items-center mt-2">
                <DollarSign size={20} className="text-green-600 mr-2" />
                <span className="text-2xl font-bold">$15,840</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">New Staff Requests</h2>
              <div className="flex items-center mt-2">
                <PlusCircle size={20} className="text-orange-600 mr-2" />
                <span className="text-2xl font-bold">3</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Pending Staff Approvals</h2>
                <button className="text-sm text-purple-600">View All</button>
              </div>
              <div className="space-y-3">
                {pendingApprovals.map(staff => (
                  <div key={staff.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{staff.name}</h3>
                        <div className="flex mt-1">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2">
                            {staff.role}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {staff.experience}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Availability: {staff.availability}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <CheckCircle size={18} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">New Client Requests</h2>
                <button className="text-sm text-purple-600">View All</button>
              </div>
              <div className="space-y-3">
                {staffRequests.map(request => (
                  <div key={request.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{request.client}</h3>
                        <p className="text-sm text-gray-500">{request.date}</p>
                        <p className="text-xs mt-1">{request.positions}</p>
                        <span className={`text-xs ${
                          request.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        } px-2 py-1 rounded mt-1 inline-block`}>
                          {request.urgency} Urgency
                        </span>
                      </div>
                      <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded mt-2">
                        Respond
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Top Clients</h2>
                <div className="flex items-center">
                  <button className="text-sm text-gray-500 border rounded px-2 py-1 flex items-center mr-2" onClick={() => setFilterOpen(!filterOpen)}>
                    <Filter size={14} className="mr-1" />
                    Filter
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                  <button className="text-sm text-purple-600">View All</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shifts</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationship</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topClients.map(client => (
                      <tr key={client.id}>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{client.name}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {client.shiftsThisMonth}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-green-600">
                          {client.value}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {client.relationship}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Top Performing Staff</h2>
                <button className="text-sm text-purple-600">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shifts</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topPerformers.map(staff => (
                      <tr key={staff.id}>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{staff.name}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {staff.shifts}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            {staff.rating}
                            <svg className="w-3 h-3 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-green-600">
                          {staff.earnings}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Active Shifts</h2>
              <div className="flex">
                <div className="relative mr-2">
                  <input
                    type="text"
                    placeholder="Search shifts..."
                    className="text-sm border rounded-md pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
                </div>
                <button className="text-sm bg-purple-600 text-white px-4 py-2 rounded">
                  + Add New Shift
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Needed</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeShifts.map(shift => (
                    <tr key={shift.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{shift.client || shift.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shift.date}</div>
                        <div className="text-sm text-gray-500">{shift.time}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900">{shift.staffAssigned}/{shift.staffNeeded}</span>
                          <div className="w-16 h-2 bg-gray-200 rounded ml-2">
                            <div 
                              className="h-2 bg-purple-500 rounded" 
                              style={{ width: `${(shift.staffAssigned / shift.staffNeeded) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          shift.status === 'Filled' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {shift.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <button className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded">
                          Details
                        </button>
                        {shift.status === 'Filling' && (
                          <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded ml-2">
                            Assign Staff
                          </button>
                        )}
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
