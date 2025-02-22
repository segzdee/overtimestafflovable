import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { AlertCircle, Clock, Users, CalendarDays, DollarSign, Bot } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

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
      // Here you would typically integrate with a payment processing service
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
    // Stub: Will be connected to Supabase
    alert('Shift Cancelled');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Business Dashboard</h2>
          <div className="flex gap-4">
            <Button variant="outline">Download Reports</Button>
            <Button
              onClick={handleActivateAI}
              disabled={isActivatingAI}
              className="bg-gradient-to-r from-purple-600 to-green-500 text-white"
            >
              <Bot className="w-4 h-4 mr-2" />
              {isActivatingAI ? "Activating..." : "Activate AI Agent"}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard
            title="Active Shifts"
            value="12"
            icon={<Clock className="h-4 w-4 text-brand-600" />}
            trend={{ value: "+2 this week", positive: true }}
          />
          <StatsCard
            title="Total Workers"
            value="48"
            icon={<Users className="h-4 w-4 text-brand-600" />}
            trend={{ value: "+5 this month", positive: true }}
          />
          <StatsCard
            title="Upcoming Shifts"
            value="8"
            icon={<CalendarDays className="h-4 w-4 text-brand-600" />}
          />
          <StatsCard
            title="Monthly Spend"
            value="$12,450"
            icon={<DollarSign className="h-4 w-4 text-brand-600" />}
            trend={{ value: "-8% vs last month", positive: false }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-600" />
                Active Shifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Evening Server</h3>
                    <p className="text-sm text-muted-foreground">Today, 6 PM - 11 PM</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        4 workers assigned
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleCancelShift('shift-1')}
                  >
                    Cancel Shift
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Kitchen Staff</h3>
                    <p className="text-sm text-muted-foreground">Today, 4 PM - 10 PM</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        2 workers assigned
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleCancelShift('shift-2')}
                  >
                    Cancel Shift
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <h3 className="font-medium text-orange-800">Cancellation Policies</h3>
                  <ul className="mt-2 text-sm text-orange-700 space-y-1">
                    <li>• Less than 12 hours notice: 50% fee applies</li>
                    <li>• Less than 24 hours notice: 25% fee applies</li>
                    <li>• More than 24 hours notice: No fee</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
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
