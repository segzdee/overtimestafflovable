
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

type TimeSlot = "morning" | "afternoon" | "evening";
type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

type AvailabilityData = {
  [key in DayOfWeek]: {
    [slot in TimeSlot]: boolean;
  };
};

interface AvailabilityFormProps {
  onSuccess?: () => void;
  initialData?: AvailabilityData;
}

export function AvailabilityForm({ onSuccess, initialData }: AvailabilityFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const defaultAvailability: AvailabilityData = {
    monday: { morning: false, afternoon: false, evening: false },
    tuesday: { morning: false, afternoon: false, evening: false },
    wednesday: { morning: false, afternoon: false, evening: false },
    thursday: { morning: false, afternoon: false, evening: false },
    friday: { morning: false, afternoon: false, evening: false },
    saturday: { morning: false, afternoon: false, evening: false },
    sunday: { morning: false, afternoon: false, evening: false },
  };
  
  const [availability, setAvailability] = useState<AvailabilityData>(initialData || defaultAvailability);
  
  const daysOfWeek: DayOfWeek[] = [
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
  ];
  
  const timeSlots: { id: TimeSlot; label: string }[] = [
    { id: "morning", label: "Morning (6am - 12pm)" },
    { id: "afternoon", label: "Afternoon (12pm - 6pm)" },
    { id: "evening", label: "Evening (6pm - 12am)" }
  ];
  
  const formatDayLabel = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };
  
  const handleCheckboxChange = (day: DayOfWeek, slot: TimeSlot) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: !prev[day][slot]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call an API to update availability
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Availability updated",
        description: "Your work availability preferences have been saved."
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update",
        description: error instanceof Error ? error.message : "An error occurred while updating your availability."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Your Work Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {daysOfWeek.map((day) => (
              <div key={day} className="space-y-2 border rounded-lg p-3">
                <Label className="font-medium text-md">{formatDayLabel(day)}</Label>
                <div className="space-y-1">
                  {timeSlots.map((slot) => (
                    <div key={`${day}-${slot.id}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${day}-${slot.id}`}
                        checked={availability[day][slot.id]}
                        onCheckedChange={() => handleCheckboxChange(day, slot.id)}
                      />
                      <Label 
                        htmlFor={`${day}-${slot.id}`} 
                        className="text-sm font-normal"
                      >
                        {slot.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Save Availability"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
