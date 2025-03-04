
import { useState } from "react";
import { MobileHeader } from "@/features/shift-worker/components/MobileHeader";
import { DesktopHeader } from "@/features/shift-worker/components/DesktopHeader";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentEarnings } from "@/features/shift-worker/components/RecentEarnings";
import AIAgentWidget from "@/components/AIAgentWidget";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Sidebar items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'organizations', label: 'Organizations', icon: 'Building2' },
    { id: 'reports', label: 'Reports', icon: 'FileText' },
    { id: 'alerts', label: 'System Alerts', icon: 'Bell' },
    { id: 'settings', label: 'System Settings', icon: 'Settings' },
  ];

  // Mock data
  const platformStats = [
    { id: 1, label: 'Total Users', count: 1248, icon: 'Users', color: 'text-blue-600' },
    { id: 2, label: 'Active Companies', count: 87, icon: 'Building', color: 'text-purple-600' },
    { id: 3, label: 'Active Agencies', count: 42, icon: 'Briefcase', color: 'text-indigo-600' },
    { id: 4, label: 'Shift Workers', count: 1119, icon: 'Clock', color: 'text-teal-600' },
  ];

  const recentUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Company', company: 'Grand Hotel', date: 'Mar 5, 2025' },
    { id: 2, name: 'Michael Wong', email: 'michael@example.com', role: 'Agency', company: 'Elite Staffing', date: 'Mar 4, 2025' },
    { id: 3, name: 'Emily Davis', email: 'emily@example.com', role: 'Shift Worker', company: null, date: 'Mar 3, 2025' },
    { id: 4, name: 'James Wilson', email: 'james@example.com', role: 'Shift Worker', company: null, date: 'Mar 3, 2025' },
    { id: 5, name: 'Patricia Lee', email: 'patricia@example.com', role: 'Company', company: 'City Restaurant', date: 'Mar 2, 2025' },
  ];

  const systemAlerts = [
    { id: 1, type: 'Error', message: 'Payment processing system error', date: 'Mar 5, 2025', time: '14:32', priority: 'High' },
    { id: 2, type: 'Warning', message: 'Database load exceeding 80% capacity', date: 'Mar 5, 2025', time: '10:15', priority: 'Medium' },
    { id: 3, type: 'Info', message: 'System update scheduled for Mar 10', date: 'Mar 4, 2025', time: '09:00', priority: 'Low' },
  ];

  const recentTransactions = [
    { id: 1, company: 'Subscription: Elite Staffing', date: 'Mar 5, 2025', hours: 0, amount: '$199.00', status: 'Paid' },
    { id: 2, company: 'Subscription: Grand Hotel', date: 'Mar 3, 2025', hours: 0, amount: '$299.00', status: 'Paid' },
    { id: 3, company: 'Platform Fee: City Restaurant', date: 'Mar 2, 2025', hours: 0, amount: '$45.50', status: 'Processing' },
  ];

  const shiftStats = [
    { month: 'Jan', count: 450 },
    { month: 'Feb', count: 520 },
    { month: 'Mar', count: 610 },
    { month: 'Apr', count: 590 },
    { month: 'May', count: 680 },
    { month: 'Jun', count: 720 },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      <MobileHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} title="Admin Portal" />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 transform md:relative md:translate-x-0 transition duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:flex md:flex-col w-64 bg-gray-900 text-white`}>
        <div className="p-4 border-b border-gray-700 hidden md:block">
          <h1 className="text-xl font-bold">OvertimeStaff</h1>
          <p className="text-gray-400 text-sm">Admin Portal</p>
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
          title="Admin Dashboard" 
          subtitle="System Overview" 
          userInitial={user?.name?.charAt(0) || "A"} 
        />

        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {platformStats.map(stat => (
              <div key={stat.id} className="bg-white rounded-lg shadow p-4">
                <h2 className="text-sm font-medium text-gray-500">{stat.label}</h2>
                <div className="flex items-center mt-2">
                  <span className={`${stat.color} mr-2`}>{stat.icon}</span>
                  <span className="text-2xl font-bold">{stat.count.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">Recent User Registrations</CardTitle>
                <button className="text-sm text-blue-600">View All Users</button>
              </CardHeader>
              <CardContent className="px-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentUsers.map(user => (
                        <tr key={user.id}>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {user.email}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'Company' ? 'bg-teal-100 text-teal-800' : 
                              user.role === 'Agency' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {user.date}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-right">
                            <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-lg font-medium">System Alerts</CardTitle>
                <button className="text-sm text-blue-600">View All Alerts</button>
              </CardHeader>
              <CardContent className="px-6">
                <div className="space-y-3">
                  {systemAlerts.map(alert => (
                    <div key={alert.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              alert.type === 'Error' ? 'bg-red-100 text-red-800' : 
                              alert.type === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.type}
                            </span>
                            <span className={`ml-2 text-xs ${
                              alert.priority === 'High' ? 'text-red-600' : 
                              alert.priority === 'Medium' ? 'text-yellow-600' :
                              'text-gray-500'
                            }`}>
                              {alert.priority} Priority
                            </span>
                          </div>
                          <h3 className="font-medium mt-1">{alert.message}</h3>
                          <p className="text-xs text-gray-500 mt-1">{alert.date} at {alert.time}</p>
                        </div>
                        <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                  <CardTitle className="text-lg font-medium">Platform Growth</CardTitle>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Monthly</button>
                    <button className="text-xs bg-white text-gray-500 border px-2 py-1 rounded">Quarterly</button>
                    <button className="text-xs bg-white text-gray-500 border px-2 py-1 rounded">Yearly</button>
                  </div>
                </CardHeader>
                <CardContent className="px-6 py-4">
                  <div className="h-64 flex items-end space-x-2">
                    {shiftStats.map((item) => (
                      <div key={item.month} className="flex-1 flex flex-col items-center">
                        <div 
                          className="bg-blue-500 w-full rounded-t" 
                          style={{ height: `${(item.count / 800) * 100}%` }}
                        ></div>
                        <div className="text-xs mt-2">{item.month}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <RecentEarnings 
              earnings={recentTransactions}
              title="Recent Transactions"
              viewAllLink="#transactions"
            />
          </div>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
              <CardTitle className="text-lg font-medium">System Performance</CardTitle>
              <button className="text-sm text-blue-600">View Details</button>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Server CPU Load</h3>
                    <span className="text-sm text-gray-500">42%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded mt-2">
                    <div className="h-2 bg-blue-500 rounded" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Memory Usage</h3>
                    <span className="text-sm text-gray-500">67%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded mt-2">
                    <div className="h-2 bg-yellow-500 rounded" style={{ width: '67%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Database Load</h3>
                    <span className="text-sm text-gray-500">83%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded mt-2">
                    <div className="h-2 bg-red-500 rounded" style={{ width: '83%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">API Response Time</h3>
                    <span className="text-sm text-gray-500">128ms</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded mt-2">
                    <div className="h-2 bg-green-500 rounded" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      
      <AIAgentWidget userType="admin" entityId={user?.id} />
    </div>
  );
}
