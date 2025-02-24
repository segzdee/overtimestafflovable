
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

interface SimulationResult {
  totalCost: number;
  hourlyRate: number;
  totalHours: number;
  numberOfStaff: number;
}

export function StaffingCostSimulator() {
  const [numberOfStaff, setNumberOfStaff] = useState<number>(1);
  const [hoursPerShift, setHoursPerShift] = useState<number>(8);
  const [ratePerHour, setRatePerHour] = useState<number>(25);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const calculateCosts = () => {
    const totalHours = numberOfStaff * hoursPerShift;
    const totalCost = totalHours * ratePerHour;
    
    setResult({
      totalCost,
      hourlyRate: ratePerHour,
      totalHours,
      numberOfStaff
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Staffing Cost Simulator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staff">Number of Staff</Label>
              <Input
                id="staff"
                type="number"
                min="1"
                value={numberOfStaff}
                onChange={(e) => setNumberOfStaff(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hours">Hours per Shift</Label>
              <Input
                id="hours"
                type="number"
                min="1"
                max="24"
                value={hoursPerShift}
                onChange={(e) => setHoursPerShift(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rate">Rate per Hour ($)</Label>
              <Input
                id="rate"
                type="number"
                min="1"
                value={ratePerHour}
                onChange={(e) => setRatePerHour(Number(e.target.value))}
              />
            </div>
          </div>

          <Button onClick={calculateCosts} className="w-full">
            Calculate Costs
          </Button>

          {result && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Simulation Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Hours:</p>
                  <p className="font-medium">{result.totalHours} hours</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost:</p>
                  <p className="font-medium">${result.totalCost.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
