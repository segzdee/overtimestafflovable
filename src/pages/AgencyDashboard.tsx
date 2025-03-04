
import { useState } from "react";
import { MobileHeader } from "@/features/shift-worker/components/MobileHeader";
import { DesktopHeader } from "@/features/shift-worker/components/DesktopHeader";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentEarnings } from "@/features/shift-worker/components/RecentEarnings";
import AIAgentWidget from "@/components/AIAgentWidget";

export default function AgencyDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Sidebar items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart' },
    { id: 'staff', label: 'Staff Management', icon: 'Users' },
    { id: 'shifts', label: 'Shift Management', icon: 'Calendar' },
    { id: 'clients', label: 'Client Companies', icon: 'Building' },
    { id: 'invoices', label: 'Invoices & Billing', icon: 'FileText' },
    { id: 'earnings', label: 'Revenue', icon: 'DollarSign' },
    { id: 'messages', label: 'Messages', icon: 'MessageSquare' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
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

  const recentEarnings = [
    { id: 1, company: 'Grand Hotel', date: 'Mar 4, 2025', hours: 24, amount: '$4,320', status: 'Paid' },
    { id: 2, company: 'City Bistro Group', date: 'Mar 2, 2025', hours: 18, amount: '$3,240', status: 'Pending' },
    { id: 3, company: 'Luxury Resort', date: 'Feb 28, 2025', hours: 16, amount: '$2,880', status: 'Paid' }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      <MobileHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} title="Agency Portal" />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 transform md:relative md:translate-x-0 transition duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:flex md:flex-col w-64 bg-gray-900 text-white`}>
        <div className="p-4 border-b border-gray-700 hidden md:block">
          <h1 className="text-xl font-bold">OvertimeStaff</h1>
          <p className="text-gray-400 text-sm">Agency Portal</p>
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
          <button 
            className="flex items-center w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-800 rounded"
            onClick={() => logout()}
          >
            <span className="mr-3">LogOut</span>
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <DesktopHeader 
          title="Agency Dashboard" 
          subtitle="Premier Staffing Solutions" 
          userInitial={user?.name?.charAt(0) || "A"} 
        />

        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Active Staff</h2>
              <div className="flex items-center mt-2">
                <span className="text-purple-600 mr-2">Users</span>
                <span className="text-2xl font-bold">48</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Active Shifts</h2>
              <div className="flex items-center mt-2">
                <span className="text-blue-600 mr-2">Calendar</span>
                <span className="text-2xl font-bold">12</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Monthly Revenue</h2>
              <div className="flex items-center mt-2">
                <span className="text-green-600 mr-2">DollarSign</span>
                <span className="text-2xl font-bold">$15,840</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">New Staff Requests</h2>
              <div className="flex items-center mt-2">
                <span className="text-orange-600 mr-2">PlusCircle</span>
                <span className="text-2xl font-bold">3</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">Pending Staff Approvals</CardTitle>
                <button className="text-sm text-purple-600">View All</button>
              </CardHeader>
              <CardContent className="px-6">
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
                            ✓
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">New Client Requests</CardTitle>
                <button className="text-sm text-purple-600">View All</button>
              </CardHeader>
              <CardContent className="px-6">
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
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">Top Clients</CardTitle>
                <div className="flex items-center">
                  <button className="text-sm text-gray-500 border rounded px-2 py-1 flex items-center mr-2" onClick={() => setFilterOpen(!filterOpen)}>
                    Filter
                  </button>
                  <button className="text-sm text-purple-600">View All</button>
                </div>
              </CardHeader>
              <CardContent className="px-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shifts</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Relationship</th>
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
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {client.relationship}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <RecentEarnings
              earnings={recentEarnings}
              title="Recent Earnings"
              viewAllLink="#earnings"
            />
          </div>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
              <CardTitle className="text-lg font-medium">Active Shifts</CardTitle>
              <div className="flex">
                <div className="relative mr-2">
                  <input
                    type="text"
                    placeholder="Search shifts..."
                    className="text-sm border rounded-md pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="absolute left-2 top-2.5 text-gray-400">Search</span>
                </div>
                <button className="text-sm bg-purple-600 text-white px-4 py-2 rounded">
                  + Add New Shift
                </button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
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
                          <button className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded mr-1">
                            Details
                          </button>
                          {shift.status === 'Filling' && (
                            <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded">
                              Assign Staff
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      
      <AIAgentWidget userType="agency" entityId={user?.id} />
    </div>
  );
}
