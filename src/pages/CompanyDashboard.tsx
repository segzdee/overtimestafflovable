
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertCircle, Clock } from "lucide-react";

export default function CompanyDashboard() {
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
        <h2 className="text-3xl font-bold tracking-tight">Company Dashboard</h2>

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
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleCancelShift('shift-1')}
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
                Cancellation Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>• Less than 12 hours notice: 50% fee applies</p>
                <p>• Less than 24 hours notice: 25% fee applies</p>
                <p>• More than 24 hours notice: No fee</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
