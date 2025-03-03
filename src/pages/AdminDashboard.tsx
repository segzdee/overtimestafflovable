
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertTriangle, Clock, XCircle, DollarSign, Users, BarChart4, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

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

  // Stub data - will be replaced with Supabase queries
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
    },
    {
      id: '3',
      name: 'Michael Johnson',
      totalEarnings: 2200,
      latePenalties: 0,
      completedShifts: 9
    }
  ]);

  const [monthlyGrowth] = useState([
    { month: 'Jan', users: 120, revenue: 15000 },
    { month: 'Feb', users: 150, revenue: 18500 },
    { month: 'Mar', users: 180, revenue: 22000 },
    { month: 'Apr', users: 210, revenue: 24500 },
    { month: 'May', users: 250, revenue: 28000 },
    { month: 'Jun', users: 280, revenue: 30000 }
  ]);

  const [systemHealth] = useState({
    uptime: "99.98%",
    apiCalls: "2.45M",
    responseTime: "125ms",
    errorRate: "0.03%"
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-500 mt-1">Platform oversight and management controls</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              Analytics
            </Button>
            <Button className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              System Status
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Platform Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.totalEarnings}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Penalties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.activePenalties}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Late clock-ins this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.activeWorkers}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.avgHourlyRate}/hr</div>
              <div className="text-xs text-muted-foreground mt-1">
                Average hourly rate
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5 text-primary" />
                Platform Growth
              </CardTitle>
              <CardDescription>
                Monthly user growth and revenue trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-end gap-2">
                {monthlyGrowth.map((month) => (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-blue-500/70 opacity-70 rounded-t-sm transition-all duration-500"
                        style={{ height: `${month.revenue / 300}px` }}
                      />
                      <div 
                        className="w-full bg-primary rounded-t-sm transition-all duration-500"
                        style={{ height: `${month.users / 3}px` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{month.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-blue-500/70 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Revenue ($)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-primary rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Users</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="h-5 w-5 text-primary" />
                System Health
              </CardTitle>
              <CardDescription>
                Current platform performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Uptime</span>
                    <span className="text-sm font-medium text-green-600">{systemHealth.uptime}</span>
                  </div>
                  <Progress value={99.98} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">API Calls</span>
                    <span className="text-sm font-medium">{systemHealth.apiCalls}</span>
                  </div>
                  <Progress value={85} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm font-medium">{systemHealth.responseTime}</span>
                  </div>
                  <Progress value={95} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm font-medium text-green-600">{systemHealth.errorRate}</span>
                  </div>
                  <Progress value={0.03} max={1} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="h-5 w-5 text-primary" />
              Top Performing Workers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Completed Shifts</TableHead>
                  <TableHead>Penalties</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topWorkers.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell className="font-medium">{worker.name}</TableCell>
                    <TableCell>${worker.totalEarnings}</TableCell>
                    <TableCell>{worker.completedShifts}</TableCell>
                    <TableCell>{worker.latePenalties}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="h-5 w-5 text-primary" />
                Late Penalties Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>5-15 minutes late</TableCell>
                    <TableCell className="font-medium text-right">5% penalty</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>15-30 minutes late</TableCell>
                    <TableCell className="font-medium text-right">10% penalty</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Over 30 minutes late</TableCell>
                    <TableCell className="font-medium text-right">25% penalty</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSign className="h-5 w-5 text-primary" />
                Overtime Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Regular Hours</TableCell>
                    <TableCell className="font-medium text-right">Base Rate</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Overtime (8+ hours)</TableCell>
                    <TableCell className="font-medium text-right">1.5x Base Rate</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Holiday Rate</TableCell>
                    <TableCell className="font-medium text-right">2x Base Rate</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
