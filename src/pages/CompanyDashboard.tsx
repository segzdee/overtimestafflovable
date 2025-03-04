
import { useState } from "react";
import { MobileHeader } from "@/features/shift-worker/components/MobileHeader";
import { DesktopHeader } from "@/features/shift-worker/components/DesktopHeader";
import { useAuth } from "@/contexts/auth";
import AIAgentWidget from "@/components/AIAgentWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RecentEarnings } from "@/features/shift-worker/components/RecentEarnings";

export default function CompanyDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Sidebar items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart' },
    { id: 'shifts', label: 'Shift Management', icon: 'Calendar' },
    { id: 'staff', label: 'Staff Requests', icon: 'UserPlus' },
    { id: 'agencies', label: 'Agency Partners', icon: 'Briefcase' },
    { id: 'staff-pool', label: 'Staff Pool', icon: 'Users' },
    { id: 'invoices', label: 'Invoices', icon: 'FileText' },
    { id: 'reports', label: 'Reports', icon: 'TrendingUp' },
    { id: 'messages', label: 'Messages', icon: 'MessageSquare' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  // Mock data
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

  const recentInvoices = [
    { id: 1, agency: 'Premier Staffing', date: 'Feb 28, 2025', amount: '$2,450.00', shifts: 15, status: 'Paid' },
    { id: 2, agency: 'Elite Hospitality Staff', date: 'Feb 25, 2025', amount: '$1,840.00', shifts: 10, status: 'Processing' },
    { id: 3, agency: 'Quick Temp Solutions', date: 'Feb 20, 2025', amount: '$1,250.00', shifts: 8, status: 'Paid' }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCancelShift = async (shiftId: string) => {
    const hoursRemaining = 10; // Stub: Calculate dynamically post-MVP
    if (hoursRemaining < 12) {
      alert('Warning: 50% Cancellation Fee Applies');
    }
    alert('Shift Cancelled');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      <MobileHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} title="Company Portal" />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 transform md:relative md:translate-x-0 transition duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:flex md:flex-col w-64 bg-gray-900 text-white`}>
        <div className="p-4 border-b border-gray-700 hidden md:block">
          <h1 className="text-xl font-bold">OvertimeStaff</h1>
          <p className="text-gray-400 text-sm">Company Portal</p>
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
            onClick={logout}
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
          title="Company Dashboard" 
          subtitle="Grand Hotel & Resort" 
          userInitial={user?.name?.charAt(0) || "C"} 
        />

        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Current Month Shifts</h2>
              <div className="flex items-center mt-2">
                <span className="text-teal-600 mr-2">Calendar</span>
                <span className="text-2xl font-bold">28</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Staff Requested</h2>
              <div className="flex items-center mt-2">
                <span className="text-blue-600 mr-2">Users</span>
                <span className="text-2xl font-bold">42</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Monthly Spend</h2>
              <div className="flex items-center mt-2">
                <span className="text-green-600 mr-2">DollarSign</span>
                <span className="text-2xl font-bold">$8,450</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-sm font-medium text-gray-500">Pending Requests</h2>
              <div className="flex items-center mt-2">
                <span className="text-orange-600 mr-2">ClipboardList</span>
                <span className="text-2xl font-bold">2</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">Upcoming Shifts</CardTitle>
                <button className="text-sm bg-teal-600 text-white px-3 py-1 rounded">
                  + Request New Shift
                </button>
              </CardHeader>
              <CardContent className="px-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Agency</th>
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
                          <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
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
                          <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
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
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">Pending Staff Requests</CardTitle>
                <button className="text-sm text-teal-600">View All</button>
              </CardHeader>
              <CardContent className="px-6">
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
                          <span className="text-gray-400 mr-1">Users</span>
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
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">Favorite Staff</CardTitle>
                <button className="text-sm text-teal-600">View All</button>
              </CardHeader>
              <CardContent className="px-6">
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
              </CardContent>
            </Card>
            
            <RecentEarnings 
              earnings={recentInvoices.map(invoice => ({
                id: invoice.id,
                company: invoice.agency,
                date: invoice.date,
                hours: invoice.shifts,
                amount: invoice.amount,
                status: invoice.status
              }))}
              title="Recent Invoices"
              viewAllLink="#invoices"
            />
          </div>
        </main>
      </div>
      
      <AIAgentWidget userType="company" entityId={user?.id} />
    </div>
  );
}
