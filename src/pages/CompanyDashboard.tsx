
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { 
  AlertCircle, 
  Clock, 
  Users, 
  CalendarDays, 
  DollarSign, 
  Bot, 
  BarChart4,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { StaffingCostSimulator } from "@/features/company/components/StaffingCostSimulator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function CompanyDashboard() {
  const { user, generateAiToken } = useAuth();
  const { toast } = useToast();
  const [isActivatingAI, setIsActivatingAI] = useState(false);

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

  const handleCancelShift = async (shiftId: string) => {
    const hoursRemaining = 10; // Stub: Calculate dynamically post-MVP
    if (hoursRemaining < 12) {
      alert('Warning: 50% Cancellation Fee Applies');
    }
    alert('Shift Cancelled');
  };

  const [staffUtilization] = useState({
    used: 83,
    unused: 17
  });

  const [staffingTrends] = useState([
    { month: 'Jan', requestsCount: 25 },
    { month: 'Feb', requestsCount: 30 },
    { month: 'Mar', requestsCount: 28 },
    { month: 'Apr', requestsCount: 35 },
    { month: 'May', requestsCount: 40 },
    { month: 'Jun', requestsCount: 38 }
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Business Dashboard</h2>
            <p className="text-gray-500 mt-1">Monitor your staffing operations and performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              Reports
            </Button>
            <Button
              onClick={handleActivateAI}
              disabled={isActivatingAI}
              className="bg-primary text-white flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              {isActivatingAI ? "Activating..." : "AI Assistant"}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard
            title="Active Shifts"
            value="12"
            icon={<Clock className="h-4 w-4 text-primary" />}
            trend={{ value: "+2 this week", positive: true }}
          />
          <StatsCard
            title="Total Workers"
            value="48"
            icon={<Users className="h-4 w-4 text-primary" />}
            trend={{ value: "+5 this month", positive: true }}
          />
          <StatsCard
            title="Upcoming Shifts"
            value="8"
            icon={<CalendarDays className="h-4 w-4 text-primary" />}
          />
          <StatsCard
            title="Monthly Spend"
            value="$12,450"
            icon={<DollarSign className="h-4 w-4 text-primary" />}
            trend={{ value: "-8% vs last month", positive: false }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5 text-primary" />
                Staffing Trends
              </CardTitle>
              <CardDescription>
                Number of shift requests over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end gap-2">
                {staffingTrends.map((month) => (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-primary rounded-t-sm transition-all duration-500"
                      style={{ height: `${month.requestsCount * 4}px` }}
                    />
                    <span className="text-xs font-medium">{month.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-primary" />
                Staff Utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[200px] space-y-4">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-[-90deg]">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="#f3f4f6"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="hsl(var(--primary))"
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 45 * staffUtilization.used / 100} ${2 * Math.PI * 45 * staffUtilization.unused / 100}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{staffUtilization.used}%</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Staff Utilization Rate
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <StaffingCostSimulator />

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="h-5 w-5 text-primary" />
                Active Shifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Evening Server</TableCell>
                    <TableCell>Today, 6 PM - 11 PM</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">4 workers assigned</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelShift('shift-1')}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kitchen Staff</TableCell>
                    <TableCell>Today, 4 PM - 10 PM</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">2 workers assigned</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelShift('shift-2')}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertCircle className="h-5 w-5 text-primary" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-amber-50 border-l-4 border-amber-400 p-4">
                  <h3 className="font-medium text-amber-800">Cancellation Policies</h3>
                  <ul className="mt-2 text-sm text-amber-700 space-y-1">
                    <li>• Less than 12 hours notice: 50% fee applies</li>
                    <li>• Less than 24 hours notice: 25% fee applies</li>
                    <li>• More than 24 hours notice: No fee</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h3 className="font-medium text-blue-800">Payment Information</h3>
                  <p className="mt-1 text-sm text-blue-700">
                    Payments are processed every Monday for the previous week's shifts.
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
