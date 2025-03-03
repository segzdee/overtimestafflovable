
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
import { CalendarDays, Clock, FileText, TrendingUp } from "lucide-react";
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

  const handleApplyShift = async (shiftId: string) => {
    // Stub: Will be connected to Supabase
    alert(`Applied to shift ${shiftId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Staff Dashboard</h2>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your shifts.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              View Schedule
            </Button>
            <Button className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Find Shifts
            </Button>
          </div>
        </div>

        <StatsOverview />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Progress
              </CardTitle>
              <CardDescription>
                You've worked {weeklyProgress.current} hours out of your {weeklyProgress.target} hour goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>{weeklyProgress.current} hours</span>
                  <span>{weeklyProgress.target} hours</span>
                </div>
                <Progress value={weeklyProgress.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current: {weeklyProgress.percentage}%</span>
                  <span>Target: 100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{activity.event}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-green-600">${activity.amount}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <ShiftEarningsOptimizer />

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Shifts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Pay Rate</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentShifts.map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell className="font-medium">{shift.title}</TableCell>
                      <TableCell>{shift.location}</TableCell>
                      <TableCell>${shift.pay_rate}/hr</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleApplyShift(shift.id)}
                        >
                          Apply
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

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
