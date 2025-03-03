
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Shift } from "@/features/shift-worker/types";
import { StatsOverview } from "@/features/shift-worker/components/StatsOverview";
import { AvailableShiftsList } from "@/features/shift-worker/components/AvailableShiftsList";
import { UrgentShiftsList } from "@/features/shift-worker/components/UrgentShiftsList";
import { WorkerProfile } from "@/features/shift-worker/components/WorkerProfile";
import { ShiftEarningsOptimizer } from "@/features/shift-worker/components/ShiftEarningsOptimizer";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, 
  CalendarDays, 
  Clock,
  DollarSign, 
  FileText, 
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ShiftWorkerDashboard() {
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

  const [upcomingShifts] = useState([
    { id: '4', date: 'May 25', time: '6:00 PM - 11:00 PM', company: 'Downtown Restaurant', role: 'Server', pay_rate: 25 },
    { id: '5', date: 'May 26', time: '7:00 PM - 1:00 AM', company: 'Midtown Lounge', role: 'Bartender', pay_rate: 32 },
    { id: '6', date: 'May 28', time: '11:00 AM - 3:00 PM', company: 'Uptown Cafe', role: 'Waiter', pay_rate: 22 }
  ]);

  const [notifications] = useState([
    { id: '1', type: 'shift', message: 'New urgent shift available in your area', time: '2 hours ago' },
    { id: '2', type: 'payment', message: 'Payment for shift #1234 has been processed', time: '1 day ago' },
    { id: '3', type: 'reminder', message: 'Your shift at Downtown Restaurant starts in 2 hours', time: '2 days ago' }
  ]);

  const handleApplyShift = async (shiftId: string) => {
    // Stub: Will be connected to Supabase
    alert(`Applied to shift ${shiftId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Staff Dashboard</h2>
            <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your shifts.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-700">
              <CalendarDays className="h-4 w-4" />
              View Schedule
            </Button>
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Clock className="h-4 w-4" />
              Find Shifts
            </Button>
          </div>
        </div>

        <StatsOverview />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-gray-800/60 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Progress
              </CardTitle>
              <CardDescription className="text-gray-400">
                You've worked {weeklyProgress.current} hours out of your {weeklyProgress.target} hour goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>{weeklyProgress.current} hours</span>
                  <span>{weeklyProgress.target} hours</span>
                </div>
                <Progress value={weeklyProgress.percentage} className="h-2 bg-gray-700" indicatorClassName="bg-primary" />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Current: {weeklyProgress.percentage}%</span>
                  <span>Target: 100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/60 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border-b border-gray-700 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {notification.type === 'shift' && <Clock className="h-4 w-4 text-blue-400" />}
                        {notification.type === 'payment' && <DollarSign className="h-4 w-4 text-green-400" />}
                        {notification.type === 'reminder' && <Bell className="h-4 w-4 text-yellow-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/60 border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CalendarDays className="h-5 w-5 text-primary" />
              Upcoming Shifts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {upcomingShifts.map((shift) => (
                <div key={shift.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg font-semibold">{shift.date}</span>
                    <span className="text-primary font-bold">${shift.pay_rate}/hr</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{shift.time}</p>
                  <p className="font-medium">{shift.role}</p>
                  <p className="text-sm text-gray-400">{shift.company}</p>
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Check In
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <ShiftEarningsOptimizer />

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <AvailableShiftsList 
            shifts={recentShifts}
            onApplyShift={handleApplyShift}
          />

          <UrgentShiftsList 
            shifts={urgentShifts}
            onApplyShift={handleApplyShift}
          />
        </div>

        <WorkerProfile 
          badges={badges}
          preferences={preferences}
        />
      </div>
    </DashboardLayout>
  );
}
