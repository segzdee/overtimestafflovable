
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/ui/stats-card";
import { Award, MapPin, Clock, AlertCircle, DollarSign, CalendarDays } from "lucide-react";

interface Shift {
  id: string;
  title: string;
  pay_rate: number;
  remaining_time?: string;
  location: string;
  status: 'open' | 'emergency' | 'filled' | 'completed';
}

export default function ShiftWorkerDashboard() {
  const [badges] = useState(['Top Performer', 'Reliable', 'Experienced']);
  const [preferences] = useState({
    location: 'NY',
    pay_rate: 20
  });
  
  // Stub data - will be replaced with Supabase queries
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

  const handleApplyShift = async (shiftId: string) => {
    // Stub: Will be connected to Supabase
    alert(`Applied to shift ${shiftId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Shift Worker Dashboard</h2>
          <Button variant="outline">View Schedule</Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard
            title="Total Earnings"
            value="$1,234"
            icon={<DollarSign className="h-4 w-4 text-brand-600" />}
            trend={{ value: "+12% vs last month", positive: true }}
          />
          <StatsCard
            title="Hours Worked"
            value="48"
            icon={<Clock className="h-4 w-4 text-brand-600" />}
            description="This month"
          />
          <StatsCard
            title="Upcoming Shifts"
            value="3"
            icon={<CalendarDays className="h-4 w-4 text-brand-600" />}
          />
          <StatsCard
            title="Rating"
            value="4.8"
            icon={<Award className="h-4 w-4 text-brand-600" />}
            description="Based on 24 reviews"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-600" />
                Available Shifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentShifts.map((shift) => (
                  <div 
                    key={shift.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-medium">{shift.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        ${shift.pay_rate}/hr
                        <span className="mx-1">•</span>
                        <MapPin className="h-4 w-4" />
                        {shift.location}
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => handleApplyShift(shift.id)}
                    >
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Urgent Shifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentShifts.map((shift) => (
                  <div 
                    key={shift.id}
                    className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50"
                  >
                    <div>
                      <h3 className="font-medium">{shift.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        ${shift.pay_rate}/hr
                        <span className="mx-1">•</span>
                        <MapPin className="h-4 w-4" />
                        {shift.location}
                      </div>
                      {shift.remaining_time && (
                        <Badge variant="destructive" className="mt-2">
                          {shift.remaining_time} left to apply
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="destructive"
                      onClick={() => handleApplyShift(shift.id)}
                    >
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-600" />
                My Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-brand-600">
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-600" />
                My Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Preferred Location</span>
                  <span className="font-medium">{preferences.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Minimum Pay Rate</span>
                  <span className="font-medium">${preferences.pay_rate}/hr</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
