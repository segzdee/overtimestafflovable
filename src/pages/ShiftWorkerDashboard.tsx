
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Award, MapPin, Clock, AlertCircle } from "lucide-react";

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

  const handleSetPreferences = async () => {
    // Stub: Will be connected to Supabase
    alert('Preferences Updated');
  };

  const handleApplyShift = async (shiftId: string) => {
    // Stub: Will be connected to Supabase
    alert(`Applied to shift ${shiftId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">My Dashboard</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-600" />
                Recently Posted Shifts
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
                      <p className="text-sm text-muted-foreground">
                        ${shift.pay_rate}/hr • {shift.location}
                      </p>
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
                      <p className="text-sm text-muted-foreground">
                        ${shift.pay_rate}/hr • {shift.location}
                      </p>
                      {shift.remaining_time && (
                        <Badge variant="destructive" className="mt-2">
                          {shift.remaining_time} left
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-brand-600" />
              My Badges
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
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{preferences.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Minimum Pay Rate</span>
                <span className="font-medium">${preferences.pay_rate}/hr</span>
              </div>
              <Button onClick={handleSetPreferences} className="w-full">
                Update Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
