
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WorkerEvaluationFormProps {
  workerId?: string;
  workerName?: string;
  shiftId?: string;
  shiftTitle?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

type WorkerEvaluationFormData = {
  attendance: number;
  punctuality: number;
  jobPerformance: number;
  teamwork: number;
  communication: number;
  overallRating: number;
  strengths: string;
  areasForImprovement: string;
  additionalComments: string;
  recommmendForFuture: "yes" | "no" | "maybe";
};

export function WorkerEvaluationForm({ 
  workerId = "worker123",
  workerName = "John Smith",
  shiftId = "shift456",
  shiftTitle = "Warehouse Assistant",
  onSuccess, 
  onCancel 
}: WorkerEvaluationFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<WorkerEvaluationFormData>({
    defaultValues: {
      attendance: 0,
      punctuality: 0,
      jobPerformance: 0,
      teamwork: 0,
      communication: 0,
      overallRating: 0,
      strengths: "",
      areasForImprovement: "",
      additionalComments: "",
      recommmendForFuture: "maybe"
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const attendance = watch("attendance");
  const punctuality = watch("punctuality");
  const jobPerformance = watch("jobPerformance");
  const teamwork = watch("teamwork");
  const communication = watch("communication");
  const overallRating = watch("overallRating");
  
  // Calculate average rating
  const calculateAverage = () => {
    const ratings = [attendance, punctuality, jobPerformance, teamwork, communication];
    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    return ratings.filter(r => r > 0).length > 0 ? (sum / ratings.filter(r => r > 0).length).toFixed(1) : "0.0";
  };

  const onSubmit = async (data: WorkerEvaluationFormData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the API to submit the evaluation
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Evaluation submitted",
        description: `Your evaluation for ${workerName} has been submitted successfully.`
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStarRating = (name: "attendance" | "punctuality" | "jobPerformance" | "teamwork" | "communication" | "overallRating", value: number, onChange: (val: number) => void) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-6 w-6 cursor-pointer",
              star <= value ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
            )}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    );
  };

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="text-lg font-medium">Evaluation Submitted</h3>
        <p className="text-sm text-gray-600">
          Your evaluation for {workerName} has been submitted successfully.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          Return to Workers
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="text-md font-medium text-gray-800">Worker Information</h3>
          <div className="mt-2">
            <span className="text-sm font-medium">Worker Name:</span>
            <span className="text-sm ml-2">{workerName}</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-medium">Position:</span>
            <span className="text-sm ml-2">{shiftTitle}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-md font-medium">Performance Ratings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <Label htmlFor="attendance" className="block mb-2">Attendance</Label>
              <input type="hidden" {...register("attendance", { required: "Attendance rating is required" })} />
              {renderStarRating("attendance", attendance, (val) => setValue("attendance", val))}
              {errors.attendance && <p className="text-red-500 text-sm mt-1">{errors.attendance.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="punctuality" className="block mb-2">Punctuality</Label>
              <input type="hidden" {...register("punctuality", { required: "Punctuality rating is required" })} />
              {renderStarRating("punctuality", punctuality, (val) => setValue("punctuality", val))}
              {errors.punctuality && <p className="text-red-500 text-sm mt-1">{errors.punctuality.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="jobPerformance" className="block mb-2">Job Performance</Label>
              <input type="hidden" {...register("jobPerformance", { required: "Job performance rating is required" })} />
              {renderStarRating("jobPerformance", jobPerformance, (val) => setValue("jobPerformance", val))}
              {errors.jobPerformance && <p className="text-red-500 text-sm mt-1">{errors.jobPerformance.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="teamwork" className="block mb-2">Teamwork</Label>
              <input type="hidden" {...register("teamwork", { required: "Teamwork rating is required" })} />
              {renderStarRating("teamwork", teamwork, (val) => setValue("teamwork", val))}
              {errors.teamwork && <p className="text-red-500 text-sm mt-1">{errors.teamwork.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="communication" className="block mb-2">Communication</Label>
              <input type="hidden" {...register("communication", { required: "Communication rating is required" })} />
              {renderStarRating("communication", communication, (val) => setValue("communication", val))}
              {errors.communication && <p className="text-red-500 text-sm mt-1">{errors.communication.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="overallRating" className="block mb-2">Overall Rating</Label>
              <input type="hidden" {...register("overallRating", { required: "Overall rating is required" })} />
              {renderStarRating("overallRating", overallRating, (val) => setValue("overallRating", val))}
              {errors.overallRating && <p className="text-red-500 text-sm mt-1">{errors.overallRating.message}</p>}
            </div>
          </div>
          
          <div className="bg-violet-50 p-3 rounded-md text-center">
            <p className="text-sm text-violet-700">Average Rating: {calculateAverage()} / 5</p>
          </div>
        </div>
        
        <div>
          <Label htmlFor="strengths">Strengths</Label>
          <Textarea
            id="strengths"
            {...register("strengths")}
            placeholder="What did the worker do well?"
            className="min-h-[80px]"
          />
        </div>
        
        <div>
          <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
          <Textarea
            id="areasForImprovement"
            {...register("areasForImprovement")}
            placeholder="What could the worker improve on?"
            className="min-h-[80px]"
          />
        </div>
        
        <div>
          <Label htmlFor="additionalComments">Additional Comments</Label>
          <Textarea
            id="additionalComments"
            {...register("additionalComments")}
            placeholder="Any other feedback or observations"
            className="min-h-[80px]"
          />
        </div>
        
        <div>
          <Label>Would you recommend this worker for future shifts?</Label>
          <RadioGroup 
            defaultValue="maybe"
            onValueChange={(value) => setValue("recommmendForFuture", value as "yes" | "no" | "maybe")}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="font-normal">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maybe" id="maybe" />
              <Label htmlFor="maybe" className="font-normal">Maybe</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="font-normal">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !attendance || !punctuality || !jobPerformance || !teamwork || !communication || !overallRating}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Submitting..." : "Submit Evaluation"}
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
