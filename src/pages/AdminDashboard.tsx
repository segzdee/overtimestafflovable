
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertTriangle, Clock, XCircle, DollarSign, Users } from "lucide-react";

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
    }
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.totalEarnings}</div>
              <p className="text-sm text-muted-foreground">Platform earnings this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                Active Penalties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.activePenalties}</div>
              <p className="text-sm text-muted-foreground">Late clock-ins this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Active Workers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.activeWorkers}</div>
              <p className="text-sm text-muted-foreground">Workers on shift today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-brand-600" />
                Average Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.avgHourlyRate}/hr</div>
              <p className="text-sm text-muted-foreground">Average hourly rate</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topWorkers.map((worker) => (
                <div 
                  key={worker.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{worker.name}</h3>
                    <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                      <span>${worker.totalEarnings} earned</span>
                      <span>{worker.completedShifts} shifts completed</span>
                      <span>{worker.latePenalties} penalties</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-600" />
                Late Penalties Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center p-2 border-b">
                  <span>5-15 minutes late</span>
                  <span className="font-medium">5% penalty</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b">
                  <span>15-30 minutes late</span>
                  <span className="font-medium">10% penalty</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span>Over 30 minutes late</span>
                  <span className="font-medium">25% penalty</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-brand-600" />
                Overtime Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center p-2 border-b">
                  <span>Regular Hours</span>
                  <span className="font-medium">Base Rate</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b">
                  <span>Overtime (8+ hours)</span>
                  <span className="font-medium">1.5x Base Rate</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span>Holiday Rate</span>
                  <span className="font-medium">2x Base Rate</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
