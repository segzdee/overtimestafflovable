
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { 
  Users, 
  Building, 
  Briefcase, 
  Clock, 
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { RecentUsersTable } from "../components/RecentUsersTable";
import { SystemAlertsCard } from "../components/SystemAlertsCard";
import { RecentTransactionsCard } from "../components/RecentTransactionsCard";
import { PlatformGrowthChart } from "../components/PlatformGrowthChart";
import { SystemPerformanceCard } from "../components/SystemPerformanceCard";

export function AdminDashboardPage() {
  // Mock data
  const [platformStats] = useState([
    { id: 1, label: 'Total Users', count: 1248, icon: Users, color: 'text-blue-600' },
    { id: 2, label: 'Active Companies', count: 87, icon: Building, color: 'text-purple-600' },
    { id: 3, label: 'Active Agencies', count: 42, icon: Briefcase, color: 'text-indigo-600' },
    { id: 4, label: 'Shift Workers', count: 1119, icon: Clock, color: 'text-teal-600' },
  ]);

  const [recentUsers] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Company', company: 'Grand Hotel', date: 'Mar 5, 2025' },
    { id: 2, name: 'Michael Wong', email: 'michael@example.com', role: 'Agency', company: 'Elite Staffing', date: 'Mar 4, 2025' },
    { id: 3, name: 'Emily Davis', email: 'emily@example.com', role: 'Shift Worker', company: null, date: 'Mar 3, 2025' },
    { id: 4, name: 'James Wilson', email: 'james@example.com', role: 'Shift Worker', company: null, date: 'Mar 3, 2025' },
    { id: 5, name: 'Patricia Lee', email: 'patricia@example.com', role: 'Company', company: 'City Restaurant', date: 'Mar 2, 2025' },
  ]);

  const [systemAlerts] = useState([
    { id: 1, type: 'Error', message: 'Payment processing system error', date: 'Mar 5, 2025', time: '14:32', priority: 'High' },
    { id: 2, type: 'Warning', message: 'Database load exceeding 80% capacity', date: 'Mar 5, 2025', time: '10:15', priority: 'Medium' },
    { id: 3, type: 'Info', message: 'System update scheduled for Mar 10', date: 'Mar 4, 2025', time: '09:00', priority: 'Low' },
  ]);

  const [recentTransactions] = useState([
    { id: 1, company: 'Subscription: Elite Staffing', date: 'Mar 5, 2025', hours: 0, amount: '$199.00', status: 'Paid' },
    { id: 2, company: 'Subscription: Grand Hotel', date: 'Mar 3, 2025', hours: 0, amount: '$299.00', status: 'Paid' },
    { id: 3, company: 'Platform Fee: City Restaurant', date: 'Mar 2, 2025', hours: 0, amount: '$45.50', status: 'Processing' },
  ]);

  const [shiftStats] = useState([
    { month: 'Jan', count: 450 },
    { month: 'Feb', count: 520 },
    { month: 'Mar', count: 610 },
    { month: 'Apr', count: 590 },
    { month: 'May', count: 680 },
    { month: 'Jun', count: 720 },
  ]);

  const [systemPerformance] = useState({
    cpu: 42,
    memory: 67,
    database: 83,
    api: 30
  });

  const handleViewUser = (userId: number) => {
    console.log(`View user details for ID: ${userId}`);
  };

  const handleResolveAlert = (alertId: number) => {
    console.log(`Resolve alert ID: ${alertId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>System Status</span>
          </Button>
          <Button size="sm" className="bg-primary text-white flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            <span>System Alerts</span>
          </Button>
        </div>
      </div>
      
      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {platformStats.map(stat => (
          <StatsCard 
            key={stat.id}
            title={stat.label} 
            value={stat.count.toLocaleString()} 
            icon={<stat.icon className={`h-5 w-5 ${stat.color}`} />} 
          />
        ))}
      </div>
      
      {/* Recent Users Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-lg font-medium">Recent User Registrations</CardTitle>
          <Button variant="link" size="sm" className="text-blue-600">View All Users</Button>
        </CardHeader>
        <CardContent className="px-4">
          <RecentUsersTable users={recentUsers} onViewUser={handleViewUser} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <SystemAlertsCard alerts={systemAlerts} onResolveAlert={handleResolveAlert} />
        <RecentTransactionsCard transactions={recentTransactions} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="text-lg font-medium">Platform Growth</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-xs py-1 px-2 h-7 bg-blue-50">Monthly</Button>
                <Button variant="outline" size="sm" className="text-xs py-1 px-2 h-7">Quarterly</Button>
                <Button variant="outline" size="sm" className="text-xs py-1 px-2 h-7">Yearly</Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <PlatformGrowthChart data={shiftStats} />
            </CardContent>
          </Card>
        </div>
        
        <SystemPerformanceCard performance={systemPerformance} />
      </div>
    </div>
  );
}
