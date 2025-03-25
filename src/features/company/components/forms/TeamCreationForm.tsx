
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Search, Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface TeamCreationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type TeamCreationFormData = {
  teamName: string;
  teamDescription: string;
  teamType: "permanent" | "project" | "shift-based";
  teamLeadId?: string;
  teamLeadName?: string;
  members: { id: string; name: string }[];
  teamColor: string;
};

export function TeamCreationForm({ onSuccess, onCancel }: TeamCreationFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<TeamCreationFormData>({
    defaultValues: {
      teamName: "",
      teamDescription: "",
      teamType: "permanent",
      members: [],
      teamColor: "#9333ea" // Default to violet
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{id: string, name: string}[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  
  const teamMembers = watch("members") || [];
  
  const searchStaff = async (term: string) => {
    if (!term || term.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setSearchTerm(term);
    setIsSearching(true);
    
    try {
      // In a real implementation, this would call the API to search for staff
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock search results
      const mockResults = [
        { id: "staff1", name: "John Smith" },
        { id: "staff2", name: "Emma Johnson" },
        { id: "staff3", name: "Michael Brown" },
        { id: "staff4", name: "Sarah Davis" },
        { id: "staff5", name: "Robert Wilson" }
      ].filter(staff => 
        staff.name.toLowerCase().includes(term.toLowerCase()) &&
        !teamMembers.some(member => member.id === staff.id)
      );
      
      setSearchResults(mockResults);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search for staff"
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const addTeamMember = (id: string, name: string) => {
    const currentMembers = watch("members") || [];
    if (!currentMembers.some(member => member.id === id)) {
      setValue("members", [...currentMembers, { id, name }]);
    }
    setSearchTerm("");
    setSearchResults([]);
  };
  
  const removeTeamMember = (id: string) => {
    const currentMembers = watch("members") || [];
    setValue("members", currentMembers.filter(member => member.id !== id));
  };
  
  const setTeamLead = (id: string, name: string) => {
    setValue("teamLeadId", id);
    setValue("teamLeadName", name);
  };

  const onSubmit = async (data: TeamCreationFormData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the API to create the team
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Team created",
        description: "Your team has been created successfully."
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create team",
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
        <h3 className="text-lg font-medium">Team Created</h3>
        <p className="text-sm text-gray-600">
          Your team "{watch("teamName")}" has been created successfully with {teamMembers.length} members.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          View All Teams
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="teamName">Team Name</Label>
          <Input
            id="teamName"
            {...register("teamName", { required: "Team name is required" })}
            placeholder="Enter team name"
            className={cn(errors.teamName && "border-red-500")}
          />
          {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="teamDescription">Team Description</Label>
          <Textarea
            id="teamDescription"
            {...register("teamDescription")}
            placeholder="Brief description of team purpose"
            className="min-h-[80px]"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="teamType">Team Type</Label>
            <Select 
              defaultValue="permanent" 
              onValueChange={(value) => setValue("teamType", value as "permanent" | "project" | "shift-based")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanent">Permanent</SelectItem>
                <SelectItem value="project">Project-based</SelectItem>
                <SelectItem value="shift-based">Shift-based</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="teamColor">Team Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="teamColor"
                type="color"
                {...register("teamColor")}
                className="w-12 h-10 p-1"
              />
              <span className="text-sm">{watch("teamColor")}</span>
            </div>
          </div>
        </div>
        
        <div>
          <Label>Team Members</Label>
          <div className="relative">
            <Input
              placeholder="Search for staff to add"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchStaff(e.target.value);
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
                {searchResults.map(staff => (
                  <li 
                    key={staff.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={() => addTeamMember(staff.id, staff.name)}
                  >
                    <span>{staff.name}</span>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-3">
            {teamMembers.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No team members added yet</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected Members ({teamMembers.length})</p>
                <ul className="space-y-2">
                  {teamMembers.map(member => (
                    <li 
                      key={member.id} 
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <div className="flex items-center">
                        <span className="text-sm">{member.name}</span>
                        {watch("teamLeadId") === member.id && (
                          <span className="ml-2 text-xs bg-violet-100 text-violet-800 px-2 py-0.5 rounded">
                            Team Lead
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {watch("teamLeadId") !== member.id && (
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-7 text-xs hover:bg-violet-100 hover:text-violet-700"
                            onClick={() => setTeamLead(member.id, member.name)}
                          >
                            Make Lead
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-7 w-7 p-0 hover:bg-red-100 hover:text-red-700"
                          onClick={() => removeTeamMember(member.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || teamMembers.length === 0 || !watch("teamLeadId")}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Creating..." : "Create Team"}
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
