
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface AgencyPartnershipFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type AgencyPartnershipFormData = {
  agencyId?: string;
  agencyName: string;
  agencyEmail: string;
  contactPerson: string;
  contactPhone: string;
  partnershipType: "exclusive" | "non-exclusive";
  staffTypes: string[];
  specialRequirements: string;
  agreementTerms: boolean;
};

export function AgencyPartnershipForm({ onSuccess, onCancel }: AgencyPartnershipFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<AgencyPartnershipFormData>({
    defaultValues: {
      agencyName: "",
      agencyEmail: "",
      contactPerson: "",
      contactPhone: "",
      partnershipType: "non-exclusive",
      staffTypes: [],
      specialRequirements: "",
      agreementTerms: false
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchResults, setSearchResults] = useState<{id: string, name: string}[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  
  const agreementTerms = watch("agreementTerms");
  
  const searchAgency = async (term: string) => {
    if (!term || term.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      // In a real implementation, this would call the API to search for agencies
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock search results
      setSearchResults([
        { id: "1", name: "ABC Staffing Agency" },
        { id: "2", name: "XYZ Recruitment Services" },
        { id: "3", name: "Reliable Workers Inc." }
      ].filter(agency => agency.name.toLowerCase().includes(term.toLowerCase())));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search for agencies"
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const selectAgency = (id: string, name: string) => {
    setValue("agencyId", id);
    setValue("agencyName", name);
    setSearchResults([]);
  };

  const onSubmit = async (data: AgencyPartnershipFormData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the API to establish the partnership
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Partnership request sent",
        description: "Your partnership request has been sent to the agency."
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send request",
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
        <h3 className="text-lg font-medium">Partnership Request Sent</h3>
        <p className="text-sm text-gray-600">
          Your partnership request has been sent to {watch("agencyName")}. You will be notified once they respond.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          View All Partnerships
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="agencyName">Agency Name</Label>
          <div className="relative">
            <Input
              id="agencyName"
              {...register("agencyName", { required: "Agency name is required" })}
              placeholder="Search for an agency"
              className={cn(errors.agencyName && "border-red-500")}
              onChange={(e) => searchAgency(e.target.value)}
              autoComplete="off"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          {errors.agencyName && <p className="text-red-500 text-sm mt-1">{errors.agencyName.message}</p>}
          
          {searchResults.length > 0 && (
            <div className="mt-1 border rounded shadow-sm bg-white z-10 absolute w-full max-w-md">
              <ul className="py-1">
                {searchResults.map(agency => (
                  <li 
                    key={agency.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectAgency(agency.id, agency.name)}
                  >
                    {agency.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="agencyEmail">Agency Email</Label>
            <Input
              id="agencyEmail"
              type="email"
              {...register("agencyEmail", { 
                required: "Agency email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="contact@agency.com"
              className={cn(errors.agencyEmail && "border-red-500")}
            />
            {errors.agencyEmail && <p className="text-red-500 text-sm mt-1">{errors.agencyEmail.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              {...register("contactPerson", { required: "Contact person is required" })}
              placeholder="Full name of contact person"
              className={cn(errors.contactPerson && "border-red-500")}
            />
            {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            {...register("contactPhone", { required: "Contact phone is required" })}
            placeholder="Phone number"
            className={cn(errors.contactPhone && "border-red-500")}
          />
          {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>}
        </div>
        
        <div>
          <Label>Partnership Type</Label>
          <RadioGroup 
            defaultValue="non-exclusive"
            onValueChange={(value) => setValue("partnershipType", value as "exclusive" | "non-exclusive")}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="exclusive" id="exclusive" />
              <Label htmlFor="exclusive" className="font-normal">
                Exclusive (Your company only works with this agency)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non-exclusive" id="non-exclusive" />
              <Label htmlFor="non-exclusive" className="font-normal">
                Non-exclusive (Your company can work with multiple agencies)
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label>Type of Staff Needed</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="skilled" value="skilled" {...register("staffTypes")} />
              <Label htmlFor="skilled" className="font-normal">Skilled Workers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="unskilled" value="unskilled" {...register("staffTypes")} />
              <Label htmlFor="unskilled" className="font-normal">Unskilled Workers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="temp" value="temp" {...register("staffTypes")} />
              <Label htmlFor="temp" className="font-normal">Temporary Staff</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="permanent" value="permanent" {...register("staffTypes")} />
              <Label htmlFor="permanent" className="font-normal">Permanent Staff</Label>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="specialRequirements">Special Requirements</Label>
          <Textarea
            id="specialRequirements"
            {...register("specialRequirements")}
            placeholder="Any specific requirements or notes for the partnership"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="flex items-start space-x-2 pt-4">
          <Checkbox 
            id="agreementTerms" 
            {...register("agreementTerms", { 
              required: "You must agree to the terms" 
            })} 
          />
          <div>
            <Label 
              htmlFor="agreementTerms" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms of the partnership
            </Label>
            <p className="text-sm text-gray-500 mt-1">
              By checking this box, you agree to establish a partnership with the selected agency and adhere to the terms and conditions.
            </p>
            {errors.agreementTerms && <p className="text-red-500 text-xs mt-1">{errors.agreementTerms.message}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !agreementTerms}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Sending Request..." : "Send Partnership Request"}
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
