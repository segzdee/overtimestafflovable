
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Clock,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export default function Index() {
  const stats = [
    {
      title: "Active Staff",
      value: "245",
      icon: Users,
      change: "+4.75%",
      changeType: "positive"
    },
    {
      title: "Open Shifts",
      value: "12",
      icon: Calendar,
      change: "-1.39%",
      changeType: "negative"
    },
    {
      title: "Clock-ins Today",
      value: "132",
      icon: Clock,
      change: "+2.4%",
      changeType: "positive"
    },
    {
      title: "Productivity",
      value: "96.2%",
      icon: TrendingUp,
      change: "+1.2%",
      changeType: "positive"
    }
  ];

  const alerts = [
    "3 staff members running late",
    "Urgent shift needs coverage",
    "New schedule published"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <Button>Create New Shift</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={cn(
                  "text-xs",
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                )}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover-card col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span>{alert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Clock In/Out
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Staff
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
