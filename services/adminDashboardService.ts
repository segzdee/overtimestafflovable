import { Users, Building, Briefcase, Clock } from 'lucide-react';

/**
 * Fetch admin dashboard data
 * This is a mock implementation - in a real app this would call an API
 */
export async function fetchAdminDashboardData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data that would normally come from an API
  return {
    platformStats: [
      { id: 1, label: 'Total Users', count: 1248, icon: Users, color: 'text-blue-600' },
      { id: 2, label: 'Active Companies', count: 87, icon: Building, color: 'text-purple-600' },
      { id: 3, label: 'Active Agencies', count: 42, icon: Briefcase, color: 'text-indigo-600' },
      { id: 4, label: 'Shift Workers', count: 1119, icon: Clock, color: 'text-teal-600' },
    ],
    recentUsers: [
      { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Company', company: 'Grand Hotel', date: 'Mar 5, 2025' },
      { id: 2, name: 'Michael Wong', email: 'michael@example.com', role: 'Agency', company: 'Elite Staffing', date: 'Mar 4, 2025' },
      { id: 3, name: 'Emily Davis', email: 'emily@example.com', role: 'Shift Worker', company: null, date: 'Mar 3, 2025' },
      { id: 4, name: 'James Wilson', email: 'james@example.com', role: 'Shift Worker', company: null, date: 'Mar 3, 2025' },
      { id: 5, name: 'Patricia Lee', email: 'patricia@example.com', role: 'Company', company: 'City Restaurant', date: 'Mar 2, 2025' },
    ],
    systemAlerts: [
      { id: 1, type: 'Error', message: 'Payment processing system error', date: 'Mar 5, 2025', time: '14:32', priority: 'High' },
      { id: 2, type: 'Warning', message: 'Database load exceeding 80% capacity', date: 'Mar 5, 2025', time: '10:15', priority: 'Medium' },
      { id: 3, type: 'Info', message: 'System update scheduled for Mar 10', date: 'Mar 4, 2025', time: '09:00', priority: 'Low' },
    ],
    performanceMetrics: {
      cpu: 42,
      memory: 67,
      database: 83,
      apiResponse: 30
    }
  };
}