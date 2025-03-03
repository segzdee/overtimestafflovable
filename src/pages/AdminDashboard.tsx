
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { 
  BarChart,
  Users,
  Calendar,
  Briefcase,
  Building,
  DollarSign,
  Activity,
  Settings,
  Bell,
  LogOut,
  Globe,
  User,
  AlertTriangle,
  Shield,
  BarChart2,
  PieChart,
  TrendingUp,
  Filter,
  Download,
  Search,
  HelpCircle,
  MessageSquare,
  Flag,
  UserCheck,
  Check,
  X
} from 'lucide-react';
import { DashboardLayout } from "@/components/DashboardLayout";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('This Month');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart size={20} /> },
    { id: 'users', label: 'User Management', icon: <Users size={20} /> },
    { id: 'shifts', label: 'Shift Activity', icon: <Calendar size={20} /> },
    { id: 'agencies', label: 'Agencies', icon: <Briefcase size={20} /> },
    { id: 'companies', label: 'Companies', icon: <Building size={20} /> },
    { id: 'revenue', label: 'Revenue & Billing', icon: <DollarSign size={20} /> },
    { id: 'analytics', label: 'Advanced Analytics', icon: <Activity size={20} /> },
    { id: 'moderation', label: 'Content Moderation', icon: <Shield size={20} /> },
    { id: 'system', label: 'System Health', icon: <Globe size={20} /> },
    { id: 'settings', label: 'Platform Settings', icon: <Settings size={20} /> }
  ];

  // Mock data
  const platformStats = [
    { id: 'users', label: 'Total Users', value: '14,582', trend: '+12.3%', icon: <User size={20} className="text-blue-500" /> },
    { id: 'shifts', label: 'Active Shifts', value: '1,248', trend: '+8.7%', icon: <Calendar size={20} className="text-green-500" /> },
    { id: 'agencies', label: 'Agencies', value: '126', trend: '+5.0%', icon: <Briefcase size={20} className="text-purple-500" /> },
    { id: 'companies', label: 'Companies', value: '342', trend: '+15.2%', icon: <Building size={20} className="text-orange-500" /> },
    { id: 'revenue', label: 'Monthly Revenue', value: '$128,450', trend: '+18.5%', icon: <DollarSign size={20} className="text-emerald-500" /> },
    { id: 'issues', label: 'Open Issues', value: '8', trend: '-24.0%', icon: <AlertTriangle size={20} className="text-red-500" /> }
  ];

  const userRegistrations = [
    { day: 'Mon', workers: 42, agencies: 3, companies: 8 },
    { day: 'Tue', workers: 38, agencies: 2, companies: 6 },
    { day: 'Wed', workers: 45, agencies: 4, companies: 9 },
    { day: 'Thu', workers: 53, agencies: 1, companies: 7 },
    { day: 'Fri', workers: 58, agencies: 3, companies: 11 },
    { day: 'Sat', workers: 34, agencies: 0, companies: 4 },
    { day: 'Sun', workers: 28, agencies: 1, companies: 3 }
  ];

  const recentAlerts = [
    { id: 1, type: 'System', message: 'Database performance degradation detected', time: '35 mins ago', severity: 'high' },
    { id: 2, type: 'Moderation', message: 'Multiple reports against agency "QuickStaff Inc"', time: '2 hours ago', severity: 'medium' },
    { id: 3, type: 'Billing', message: 'Payment processor webhook errors detected', time: '4 hours ago', severity: 'medium' },
    { id: 4, type: 'Security', message: 'Unusual login pattern from admin user', time: '6 hours ago', severity: 'high' }
  ];

  const pendingVerifications = [
    { id: 1, name: 'Elite Staffing Agency', type: 'Agency', status: 'Document Verification', waiting: '2 days' },
    { id: 2, name: 'Grand Resort Hotel', type: 'Company', status: 'Business Verification', waiting: '1 day' },
    { id: 3, name: 'Quick Service Temps', type: 'Agency', status: 'Background Check', waiting: '3 days' },
    { id: 4, name: 'City Conference Center', type: 'Company', status: 'Document Verification', waiting: '5 hours' }
  ];

  const topPerformingCities = [
    { id: 1, city: 'New York', shifts: 345, revenue: '$48,250', growth: '+14.2%' },
    { id: 2, city: 'Los Angeles', shifts: 278, revenue: '$38,920', growth: '+10.8%' },
    { id: 3, city: 'Chicago', shifts: 213, revenue: '$29,820', growth: '+8.5%' },
    { id: 4, city: 'Miami', shifts: 187, revenue: '$26,180', growth: '+21.3%' },
    { id: 5, city: 'Las Vegas', shifts: 156, revenue: '$21,840', growth: '+18.7%' }
  ];

  const recentReports = [
    { id: 1, reporter: 'Grand Hotel', against: 'John Smith (Worker)', reason: 'No-show for confirmed shift', time: '2 hours ago', status: 'New' },
    { id: 2, reporter: 'Emma Wilson (Worker)', against: 'City Bistro', reason: 'Unsafe working conditions', time: '5 hours ago', status: 'Under Review' },
    { id: 3, reporter: 'Elite Staffing', against: 'Downtown Bar', reason: 'Payment dispute', time: '1 day ago', status: 'Under Review' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">OvertimeStaff</h1>
          <p className="text-gray-400 text-sm">Admin Portal</p>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-semibold">Platform Overview</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                8
              </span>
            </div>
            <div className="flex items-center border rounded-lg px-2 py-1">
              <span className="text-sm font-medium mr-2">View:</span>
              <select 
                className="text-sm bg-transparent border-0 focus:ring-0"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Platform Stats Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
            {platformStats.map(stat => (
              <div key={stat.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  {stat.icon}
                  <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mt-2">{stat.value}</h2>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center">
                  <BarChart2 size={18} className="mr-2 text-gray-500" />
                  User Registration Trends
                </h2>
                <div className="flex items-center">
                  <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2">
                    <Filter size={12} className="inline mr-1" />
                    Filter
                  </button>
                  <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    <Download size={12} className="inline mr-1" />
                    Export
                  </button>
                </div>
              </div>
              
              {/* Mock Chart - in a real implementation this would be a chart component */}
              <div className="w-full h-64 bg-gray-50 rounded p-4 flex items-end justify-between">
                {userRegistrations.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-end h-40">
                      <div className="w-4 bg-blue-500 rounded-t mx-1" style={{ height: `${data.workers * 0.7}px` }}></div>
                      <div className="w-4 bg-purple-500 rounded-t mx-1" style={{ height: `${data.agencies * 10}px` }}></div>
                      <div className="w-4 bg-orange-500 rounded-t mx-1" style={{ height: `${data.companies * 4}px` }}></div>
                    </div>
                    <span className="text-xs mt-2">{data.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-2">
                <div className="flex items-center mx-2">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                  <span className="text-xs">Workers</span>
                </div>
                <div className="flex items-center mx-2">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
                  <span className="text-xs">Agencies</span>
                </div>
                <div className="flex items-center mx-2">
                  <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
                  <span className="text-xs">Companies</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center">
                  <PieChart size={18} className="mr-2 text-gray-500" />
                  Revenue Distribution
                </h2>
                <div className="flex items-center">
                  <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2">
                    <Filter size={12} className="inline mr-1" />
                    Filter
                  </button>
                  <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    <Download size={12} className="inline mr-1" />
                    Export
                  </button>
                </div>
              </div>
              
              {/* Mock Pie Chart */}
              <div className="flex">
                <div className="w-1/2 flex justify-center items-center">
                  <div className="relative w-32 h-32 rounded-full bg-gray-100">
                    <div className="absolute inset-0 border-8 border-transparent border-t-blue-500 border-r-emerald-500 border-b-purple-500 border-l-orange-500 rounded-full"></div>
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                      <span className="font-bold text-lg">$128,450</span>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                      <span className="text-sm">Service Fees (42%)</span>
                      <span className="ml-auto font-medium">$53,949</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded mr-2"></div>
                      <span className="text-sm">Premium Listings (28%)</span>
                      <span className="ml-auto font-medium">$35,966</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                      <span className="text-sm">Agency Subscriptions (18%)</span>
                      <span className="ml-auto font-medium">$23,121</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                      <span className="text-sm">Other Revenue (12%)</span>
                      <span className="ml-auto font-medium">$15,414</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts and Verifications Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center">
                  <AlertTriangle size={18} className="mr-2 text-red-500" />
                  System Alerts
                </h2>
                <button className="text-xs text-red-600 hover:underline">View All Alerts</button>
              </div>
              <div className="space-y-3">
                {recentAlerts.map(alert => (
                  <div key={alert.id} className={`border-l-4 ${
                    alert.severity === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
                  } p-3 rounded`}>
                    <div className="flex justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        alert.type === 'System' ? 'bg-red-200 text-red-800' :
                        alert.type === 'Moderation' ? 'bg-purple-200 text-purple-800' :
                        alert.type === 'Billing' ? 'bg-green-200 text-green-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <p className="mt-1">{alert.message}</p>
                    <div className="mt-2 flex">
                      <button className="text-xs bg-white border border-gray-300 rounded px-2 py-1 mr-2">
                        Acknowledge
                      </button>
                      <button className="text-xs text-white bg-red-600 rounded px-2 py-1">
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center">
                  <UserCheck size={18} className="mr-2 text-blue-500" />
                  Pending Verifications
                </h2>
                <button className="text-xs text-blue-600 hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {pendingVerifications.map(verification => (
                  <div key={verification.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{verification.name}</h3>
                        <div className="flex mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            verification.type === 'Agency' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {verification.type}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">Waiting: {verification.waiting}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Status: {verification.status}</p>
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <Check size={18} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Performance and Reports Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center">
                  <Globe size={18} className="mr-2 text-gray-500" />
                  Top Performing Cities
                </h2>
                <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  <Download size={12} className="inline mr-1" />
                  Export
                </button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shifts</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topPerformingCities.map(city => (
                    <tr key={city.id}>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="font-medium">{city.city}</div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                        {city.shifts}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-green-600">
                        {city.revenue}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {city.growth}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-4">
                <button className="text-sm text-gray-500 hover:text-gray-700">View Full Report</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center">
                  <Flag size={18} className="mr-2 text-orange-500" />
                  Recent Reports & Disputes
                </h2>
                <button className="text-xs text-orange-600 hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {recentReports.map(report => (
                  <div key={report.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{report.reporter}</h3>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mx-1 text-gray-400">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <h3 className="font-medium">{report.against}</h3>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{report.reason}</p>
                        <div className="flex mt-1">
                          <span className="text-xs text-gray-500">{report.time}</span>
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            report.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                      <button className="text-xs bg-orange-600 text-white px-2 py-1 rounded">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="grid grid-cols-5 gap-4">
              <button className="p-3 text-center hover:bg-gray-50 rounded">
                <Search size={20} className="mx-auto mb-1 text-gray-600" />
                <span className="text-sm">User Lookup</span>
              </button>
              <button className="p-3 text-center hover:bg-gray-50 rounded">
                <MessageSquare size={20} className="mx-auto mb-1 text-gray-600" />
                <span className="text-sm">Send System Notice</span>
              </button>
              <button className="p-3 text-center hover:bg-gray-50 rounded">
                <Shield size={20} className="mx-auto mb-1 text-gray-600" />
                <span className="text-sm">Security Audit</span>
              </button>
              <button className="p-3 text-center hover:bg-gray-50 rounded">
                <TrendingUp size={20} className="mx-auto mb-1 text-gray-600" />
                <span className="text-sm">Generate Reports</span>
              </button>
              <button className="p-3 text-center hover:bg-gray-50 rounded">
                <HelpCircle size={20} className="mx-auto mb-1 text-gray-600" />
                <span className="text-sm">Support Tools</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
