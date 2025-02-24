
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Calendar, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Assignment {
  id: string;
  worker: string;
  shift: string;
  location: string;
  date: string;
}

export function BulkAssignmentWizard() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [assignments] = useState<Assignment[]>([
    {
      id: "1",
      worker: "John Smith",
      shift: "Evening Server",
      location: "Downtown Restaurant",
      date: "2024-03-20"
    },
    {
      id: "2",
      worker: "Sarah Johnson",
      shift: "Bartender",
      location: "Luxury Hotel Bar",
      date: "2024-03-20"
    }
  ]);

  const nextStep = () => {
    setStep(step + 1);
    setProgress(progress + 33);
  };

  const prevStep = () => {
    setStep(step - 1);
    setProgress(progress - 33);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Bulk Assignment Wizard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Progress value={progress} className="mb-6" />

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Step 1: Select Date Range</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input type="date" id="start-date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input type="date" id="end-date" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Step 2: Review Assignments</h3>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{assignment.worker}</p>
                      <p className="text-sm text-muted-foreground">
                        {assignment.shift} at {assignment.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {assignment.date}
                      </p>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-2">Assignments Complete</h3>
                <p className="text-muted-foreground">
                  All shifts have been successfully assigned
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={nextStep} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button onClick={() => setStep(1)} className="ml-auto">
                Start New Bulk Assignment
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
