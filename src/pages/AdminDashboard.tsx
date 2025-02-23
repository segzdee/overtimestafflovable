
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkerStats {
  id: string;
  name: string;
  totalEarnings: number;
  latePenalties: number;
  completedShifts: number;
}

export default function AdminDashboard() {
  const [analytics] = useState({
    totalEarnings: 25480,
    avgHourlyRate: 28,
    activePenalties: 3,
    activeWorkers: 45,
  });

  const [topWorkers] = useState<WorkerStats[]>([
    {
      id: '1',
      name: 'John Smith',
      totalEarnings: 2800,
      latePenalties: 0,
      completedShifts: 12
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      totalEarnings: 2400,
      latePenalties: 1,
      completedShifts: 10
    }
  ]);

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.totalEarnings}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Workers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.activeWorkers}</div>
              <p className="text-xs text-muted-foreground">
                +12 since last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.avgHourlyRate}/hr</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Penalties
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.activePenalties}</div>
              <p className="text-xs text-muted-foreground">
                -2 from last week
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Top Performing Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {topWorkers.map((worker) => (
                  <div key={worker.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{worker.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {worker.completedShifts} shifts completed
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+${worker.totalEarnings}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      New shift posted
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Evening Server • Manhattan
                    </p>
                  </div>
                  <div className="ml-auto font-medium">Just now</div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Worker assigned
                    </p>
                    <p className="text-sm text-muted-foreground">
                      John Smith • Bar Staff
                    </p>
                  </div>
                  <div className="ml-auto font-medium">2h ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Shift Completion Rate
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Last 30 days
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">98%</span>
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Worker Satisfaction
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Based on surveys
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">4.8</span>
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Staff Training
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tomorrow at 2:00 PM
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Monthly Review
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Friday at 11:00 AM
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
