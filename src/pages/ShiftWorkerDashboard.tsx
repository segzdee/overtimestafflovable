
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Award, MapPin, DollarSign } from "lucide-react";

export default function ShiftWorkerDashboard() {
  const [badges] = useState(['Top Performer', 'Reliable', 'Experienced']);
  const [preferences] = useState({
    location: 'NY',
    pay_rate: 20
  });

  const handleSetPreferences = async () => {
    // Stub: Will be connected to Supabase
    alert('Preferences Updated');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">My Dashboard</h2>

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
