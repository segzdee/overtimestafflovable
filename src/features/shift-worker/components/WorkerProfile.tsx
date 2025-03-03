
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, MapPin, DollarSign } from "lucide-react";

interface WorkerProfileProps {
  badges: string[];
  preferences: {
    location: string;
    pay_rate: number;
  };
}

export function WorkerProfile({ badges, preferences }: WorkerProfileProps) {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Award className="h-5 w-5 text-primary" />
            My Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {badges.map((badge) => (
              <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1">
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-5 w-5 text-primary" />
            My Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Preferred Location</span>
              </div>
              <span className="font-medium">{preferences.location}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Minimum Pay Rate</span>
              </div>
              <span className="font-medium">${preferences.pay_rate}/hr</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
