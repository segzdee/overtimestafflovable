
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ShiftSuggestion {
  id: string;
  day: string;
  time: string;
  potentialEarnings: number;
  demandLevel: "High" | "Medium" | "Low";
}

export function ShiftEarningsOptimizer() {
  const [suggestions] = useState<ShiftSuggestion[]>([
    {
      id: "1",
      day: "Friday",
      time: "Evening",
      potentialEarnings: 200,
      demandLevel: "High"
    },
    {
      id: "2",
      day: "Saturday",
      time: "Night",
      potentialEarnings: 250,
      demandLevel: "High"
    },
    {
      id: "3",
      day: "Sunday",
      time: "Morning",
      potentialEarnings: 180,
      demandLevel: "Medium"
    }
  ]);

  const getDemandColor = (level: ShiftSuggestion["demandLevel"]) => {
    switch (level) {
      case "High":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Shift Earnings Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Weekly Earning Potential</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current: $800</span>
                <span>Optimized: $1,200</span>
              </div>
              <Progress value={66} />
              <p className="text-sm text-muted-foreground">
                You could earn up to 50% more by optimizing your schedule
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Recommended High-Earning Shifts</h3>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div>
                  <p className="font-medium">{suggestion.day} - {suggestion.time}</p>
                  <p className={`text-sm ${getDemandColor(suggestion.demandLevel)}`}>
                    {suggestion.demandLevel} Demand
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {suggestion.potentialEarnings}
                  </p>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
