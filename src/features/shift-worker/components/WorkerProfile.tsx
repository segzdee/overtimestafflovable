
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, MapPin } from "lucide-react";

interface WorkerProfileProps {
  badges: string[];
  preferences: {
    location: string;
    pay_rate: number;
  };
}

export function WorkerProfile({ badges, preferences }: WorkerProfileProps) {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
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
  );
}
