
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  AlertCircle, 
  Clock, 
  Users, 
  CalendarDays, 
  DollarSign,
  Bot,
  Activity,
  BarChart,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function CompanyDashboard() {
  const { user, generateAiToken } = useAuth();
  const { toast } = useToast();
  const [isActivatingAI, setIsActivatingAI] = useState(false);
  const [stats] = useState({
    activeShifts: 12,
    totalWorkers: 48,
    upcomingShifts: 8,
    monthlySpend: 12450
  });

  const handleActivateAI = async () => {
    setIsActivatingAI(true);
    try {
      const token = await generateAiToken("Company AI Assistant", user?.id || "");
      toast({
        title: "AI Agent Activated",
        description: "Your AI agent has been successfully activated. Save this token for future use.",
      });
      console.log("AI Agent Token:", token);
    } catch (error) {
      toast({
        title: "Activation Failed",
        description: "Failed to activate AI agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActivatingAI(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Business Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Download Reports</Button>
            <Button
              onClick={handleActivateAI}
              disabled={isActivatingAI}
              className="bg-gradient-to-r from-purple-600 to-green-500 text-white"
            >
              <Bot className="mr-2 h-4 w-4" />
              {isActivatingAI ? "Activating..." : "Activate AI Agent"}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Shifts
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeShifts}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Workers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWorkers}</div>
              <p className="text-xs text-muted-foreground">
                +5 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Spend
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.monthlySpend}</div>
              <p className="text-xs text-muted-foreground">
                -8% vs last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Shifts
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingShifts}</div>
              <p className="text-xs text-muted-foreground">
                Next 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Active Shifts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Evening Server</p>
                    <p className="text-sm text-muted-foreground">
                      Today, 6 PM - 11 PM • 4 workers
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Kitchen Staff</p>
                    <p className="text-sm text-muted-foreground">
                      Today, 4 PM - 10 PM • 2 workers
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Cancellation Policy
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Less than 12 hours notice: 50% fee applies
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Payment Processing
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Next payment processing: Monday
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
