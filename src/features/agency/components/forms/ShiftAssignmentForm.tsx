
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Search, Calendar, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ShiftAssignmentFormProps {
  shiftId?: string;
  shiftTitle?: string;
  shiftDate?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

type ShiftAssignmentFormData = {
  workerId: string;
  workerName: string;
  assignmentNotes: string;
  hourlyRate: number;
  transportationProvided: boolean;
  confirmAvailability: boolean;
  sendNotification: boolean;
};

export function ShiftAssignmentForm({ 
  shiftId = "",
  shiftTitle = "Warehouse Assistant",
  shiftDate = "2023-06-15",
  onSuccess, 
  onCancel 
}: ShiftAssignmentFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ShiftAssignmentFormData>({
    defaultValues: {
      workerId: "",
      workerName: "",
      assignmentNotes: "",
      hourlyRate: 15,
      transportationProvided: false,
      confirmAvailability: true,
      sendNotification: true
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{id: string, name: string, rating: number}[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  
  const confirmAvailability = watch("confirmAvailability");
  const transportationProvided = watch("transportationProvided");
  const sendNotification = watch("sendNotification");
  const workerName = watch("workerName");
  
  const searchWorkers = async (term: string) => {
    if (!term || term.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setSearchTerm(term);
    setIsSearching(true);
    
    try {
      // In a real implementation, this would call the API to search for workers
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock search results
      const mockResults = [
        { id: "worker1", name: "John Smith", rating: 4.8 },
        { id: "worker2", name: "Emma Johnson", rating: 4.5 },
        { id: "worker3", name: "Michael Brown", rating: 4.2 },
        { id: "worker4", name: "Sarah Davis", rating: 4.9 },
        { id: "worker5", name: "Robert Wilson", rating: 4.0 }
      ].filter(worker => worker.name.toLowerCase().includes(term.toLowerCase()));
      
      setSearchResults(mockResults);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search for workers"
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const selectWorker = (id: string, name: string) => {
    setValue("workerId", id);
    setValue("workerName", name);
    setSearchTerm("");
    setSearchResults([]);
  };

  const onSubmit = async (data: ShiftAssignmentFormData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the API to assign the worker
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Worker assigned",
        description: `${data.workerName} has been assigned to the shift successfully.`
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Assignment failed",
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
        <h3 className="text-lg font-medium">Worker Assigned Successfully</h3>
        <p className="text-sm text-gray-600">
          {workerName} has been assigned to the shift: {shiftTitle} on {shiftDate}.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          View Shift Details
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="text-md font-medium text-gray-800">Shift Details</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{shiftDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">9:00 AM - 5:00 PM</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium">Position:</span>
            <span className="text-sm ml-2">{shiftTitle}</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-medium">Location:</span>
            <span className="text-sm ml-2">123 Warehouse St, Chicago, IL</span>
          </div>
        </div>
        
        <div>
          <Label>Select Worker</Label>
          <div className="relative">
            <Input
              placeholder="Search for workers by name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchWorkers(e.target.value);
              }}
              className="mt-1"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-1 border rounded shadow-sm bg-white z-10 absolute w-full max-w-md">
              <ul className="py-1">
                {searchResults.map(worker => (
                  <li 
                    key={worker.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectWorker(worker.id, worker.name)}
                  >
                    <div className="flex justify-between">
                      <span>{worker.name}</span>
                      <span className="text-sm text-yellow-600">★ {worker.rating.toFixed(1)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {workerName && (
            <div className="mt-2 p-3 bg-violet-50 rounded-md">
              <p className="font-medium text-violet-800">{workerName}</p>
              <p className="text-sm text-violet-600">Selected for assignment</p>
            </div>
          )}
          
          {!workerName && !searchTerm && (
            <p className="text-sm text-gray-500 mt-2">Search for a worker to assign to this shift</p>
          )}
          
          {errors.workerId && <p className="text-red-500 text-sm mt-1">Please select a worker</p>}
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
        
        <div>
          <Label htmlFor="assignmentNotes">Assignment Notes</Label>
          <Textarea
            id="assignmentNotes"
            {...register("assignmentNotes")}
            placeholder="Add any specific instructions for this worker"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="confirmAvailability" 
              checked={confirmAvailability}
              onCheckedChange={(checked) => {
                setValue("confirmAvailability", checked === true);
              }}
            />
            <Label htmlFor="confirmAvailability" className="font-normal">
              Confirm worker availability before assignment
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="transportationProvided" 
              checked={transportationProvided}
              onCheckedChange={(checked) => {
                setValue("transportationProvided", checked === true);
              }}
            />
            <Label htmlFor="transportationProvided" className="font-normal">
              Transportation provided
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sendNotification" 
              checked={sendNotification}
              onCheckedChange={(checked) => {
                setValue("sendNotification", checked === true);
              }}
            />
            <Label htmlFor="sendNotification" className="font-normal">
              Send notification to worker
            </Label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !workerName}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Assigning..." : "Assign Worker"}
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
