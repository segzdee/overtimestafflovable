
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CheckCircle, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface StaffRequestFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type StaffRequestFormData = {
  position: string;
  numberOfStaff: number;
  startDate: Date;
  endDate?: Date;
  requestType: "one-time" | "recurring";
  duration: string;
  hourlyRate: number;
  location: string;
  skills: string;
  notes: string;
  urgentRequest: boolean;
};

export function StaffRequestForm({ onSuccess, onCancel }: StaffRequestFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<StaffRequestFormData>({
    defaultValues: {
      position: "",
      numberOfStaff: 1,
      requestType: "one-time",
      duration: "",
      hourlyRate: 15,
      location: "",
      skills: "",
      notes: "",
      urgentRequest: false
    }
  });
  
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const requestType = watch("requestType");

  const onSubmit = async (data: StaffRequestFormData) => {
    if (!startDate) return;
    
    setIsLoading(true);
    data.startDate = startDate;
    if (endDate) data.endDate = endDate;
    
    try {
      // In a real implementation, this would call the API to submit the request
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Staff request submitted",
        description: "Your request for staff has been submitted successfully."
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to submit request",
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
        <h3 className="text-lg font-medium">Request Submitted</h3>
        <p className="text-sm text-gray-600">
          Your staff request has been submitted and is being processed.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          View All Requests
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            {...register("position", { required: "Position is required" })}
            placeholder="e.g., Warehouse Worker"
            className={cn(errors.position && "border-red-500")}
          />
          {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="numberOfStaff">Number of Staff</Label>
            <Input
              id="numberOfStaff"
              type="number"
              min="1"
              step="1"
              {...register("numberOfStaff", { 
                required: "Number of staff is required",
                min: { value: 1, message: "At least 1 staff member is required" }
              })}
              className={cn(errors.numberOfStaff && "border-red-500")}
            />
            {errors.numberOfStaff && <p className="text-red-500 text-sm mt-1">{errors.numberOfStaff.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="requestType">Request Type</Label>
            <Select 
              defaultValue="one-time" 
              onValueChange={(value) => setValue("requestType", value as "one-time" | "recurring")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">One-Time</SelectItem>
                <SelectItem value="recurring">Recurring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {!startDate && <p className="text-red-500 text-sm mt-1">Start date is required</p>}
          </div>

          {requestType === "recurring" && (
            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => 
                      date < (startDate || new Date())
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="duration">Shift Duration</Label>
            <Input
              id="duration"
              {...register("duration", { required: "Duration is required" })}
              placeholder="e.g., 8 hours, 9am-5pm"
              className={cn(errors.duration && "border-red-500")}
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
          </div>
          
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
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            {...register("location", { required: "Location is required" })}
            placeholder="Work location address"
            className={cn(errors.location && "border-red-500")}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="skills">Required Skills (comma separated)</Label>
          <Input
            id="skills"
            {...register("skills")}
            placeholder="e.g., forklift certification, manual handling"
          />
        </div>
        
        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Any specific requirements or information"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="urgentRequest" 
            {...register("urgentRequest")} 
          />
          <Label 
            htmlFor="urgentRequest" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mark as urgent request (additional fees may apply)
          </Label>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !startDate}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Submitting..." : "Submit Request"}
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
