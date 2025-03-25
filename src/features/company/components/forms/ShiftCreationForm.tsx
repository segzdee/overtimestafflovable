
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CheckCircle, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ShiftCreationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type ShiftFormData = {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  hourlyRate: number;
  staffNeeded: number;
  requiredSkills: string;
};

export function ShiftCreationForm({ onSuccess, onCancel }: ShiftCreationFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ShiftFormData>({
    defaultValues: {
      title: "",
      description: "",
      startTime: "09:00",
      endTime: "17:00",
      location: "",
      hourlyRate: 15,
      staffNeeded: 1,
      requiredSkills: ""
    }
  });
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: ShiftFormData) => {
    if (!date) return;
    
    setIsLoading(true);
    data.date = date;
    
    try {
      // In a real implementation, this would call the API to create the shift
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Shift created",
        description: "The new shift has been created successfully."
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create shift",
        description: error instanceof Error ? error.message : "An error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="text-lg font-medium">Shift Created Successfully</h3>
        <p className="text-sm text-gray-600">
          Your new shift has been created and is now available.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          View All Shifts
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Shift Title</Label>
          <Input
            id="title"
            {...register("title", { required: "Shift title is required" })}
            placeholder="e.g., Warehouse Assistant"
            className={cn(errors.title && "border-red-500")}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Describe the shift duties and requirements"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {!date && <p className="text-red-500 text-sm mt-1">Date is required</p>}
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location", { required: "Location is required" })}
              placeholder="Address or location name"
              className={cn(errors.location && "border-red-500")}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              <Input
                id="startTime"
                type="time"
                {...register("startTime", { required: "Start time is required" })}
                className={cn(errors.startTime && "border-red-500")}
              />
            </div>
            {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              <Input
                id="endTime"
                type="time"
                {...register("endTime", { required: "End time is required" })}
                className={cn(errors.endTime && "border-red-500")}
              />
            </div>
            {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input
              id="hourlyRate"
              type="number"
              step="0.01"
              min="0"
              {...register("hourlyRate", { 
                required: "Hourly rate is required",
                min: { value: 0, message: "Rate must be a positive number" }
              })}
              className={cn(errors.hourlyRate && "border-red-500")}
            />
            {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="staffNeeded">Staff Needed</Label>
            <Input
              id="staffNeeded"
              type="number"
              min="1"
              step="1"
              {...register("staffNeeded", { 
                required: "Staff needed is required",
                min: { value: 1, message: "At least 1 staff member is required" }
              })}
              className={cn(errors.staffNeeded && "border-red-500")}
            />
            {errors.staffNeeded && <p className="text-red-500 text-sm mt-1">{errors.staffNeeded.message}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="requiredSkills">Required Skills (comma separated)</Label>
          <Input
            id="requiredSkills"
            {...register("requiredSkills")}
            placeholder="e.g., forklift certification, manual handling"
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !date}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Creating..." : "Create Shift"}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
