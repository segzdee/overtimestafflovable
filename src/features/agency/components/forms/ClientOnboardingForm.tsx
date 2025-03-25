
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Building } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface ClientOnboardingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type ClientOnboardingFormData = {
  companyName: string;
  industry: string;
  website: string;
  businessRegistrationNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  contactJobTitle: string;
  billingEmail: string;
  billingPhone: string;
  paymentTerms: string;
  staffingNeeds: string;
  staffingVolume: string;
  preferredStartDate: string;
  additionalRequirements: string;
  termsAgreement: boolean;
};

export function ClientOnboardingForm({ onSuccess, onCancel }: ClientOnboardingFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ClientOnboardingFormData>({
    defaultValues: {
      companyName: "",
      industry: "",
      website: "",
      businessRegistrationNumber: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      contactFirstName: "",
      contactLastName: "",
      contactEmail: "",
      contactPhone: "",
      contactJobTitle: "",
      billingEmail: "",
      billingPhone: "",
      paymentTerms: "net30",
      staffingNeeds: "",
      staffingVolume: "0-10",
      preferredStartDate: "",
      additionalRequirements: "",
      termsAgreement: false
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const termsAgreement = watch("termsAgreement");

  const onSubmit = async (data: ClientOnboardingFormData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the API to onboard the client
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Client onboarded",
        description: "The client has been onboarded successfully."
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Onboarding failed",
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
        <h3 className="text-lg font-medium">Client Onboarded Successfully</h3>
        <p className="text-sm text-gray-600">
          {watch("companyName")} has been successfully onboarded as a client.
          Our team will reach out to finalize the details.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          View All Clients
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-violet-600" />
          <h3 className="text-lg font-medium">Company Information</h3>
        </div>
        
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            {...register("companyName", { required: "Company name is required" })}
            placeholder="Enter company name"
            className={cn(errors.companyName && "border-red-500")}
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Select 
              onValueChange={(value) => setValue("industry", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="hospitality">Hospitality</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="logistics">Logistics & Warehousing</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              {...register("website")}
              placeholder="www.company.com"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="businessRegistrationNumber">Business Registration Number</Label>
          <Input
            id="businessRegistrationNumber"
            {...register("businessRegistrationNumber", { required: "Business registration number is required" })}
            placeholder="Enter business registration number"
            className={cn(errors.businessRegistrationNumber && "border-red-500")}
          />
          {errors.businessRegistrationNumber && <p className="text-red-500 text-sm mt-1">{errors.businessRegistrationNumber.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address", { required: "Address is required" })}
            placeholder="Enter company address"
            className={cn(errors.address && "border-red-500")}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city", { required: "City is required" })}
              placeholder="Enter city"
              className={cn(errors.city && "border-red-500")}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              {...register("state", { required: "State is required" })}
              placeholder="Enter state"
              className={cn(errors.state && "border-red-500")}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              {...register("zipCode", { required: "ZIP code is required" })}
              placeholder="Enter ZIP code"
              className={cn(errors.zipCode && "border-red-500")}
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">Primary Contact Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactFirstName">First Name</Label>
            <Input
              id="contactFirstName"
              {...register("contactFirstName", { required: "First name is required" })}
              placeholder="Enter first name"
              className={cn(errors.contactFirstName && "border-red-500")}
            />
            {errors.contactFirstName && <p className="text-red-500 text-sm mt-1">{errors.contactFirstName.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="contactLastName">Last Name</Label>
            <Input
              id="contactLastName"
              {...register("contactLastName", { required: "Last name is required" })}
              placeholder="Enter last name"
              className={cn(errors.contactLastName && "border-red-500")}
            />
            {errors.contactLastName && <p className="text-red-500 text-sm mt-1">{errors.contactLastName.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactEmail">Email</Label>
            <Input
              id="contactEmail"
              type="email"
              {...register("contactEmail", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Enter email address"
              className={cn(errors.contactEmail && "border-red-500")}
            />
            {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="contactPhone">Phone</Label>
            <Input
              id="contactPhone"
              {...register("contactPhone", { required: "Phone number is required" })}
              placeholder="Enter phone number"
              className={cn(errors.contactPhone && "border-red-500")}
            />
            {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="contactJobTitle">Job Title</Label>
          <Input
            id="contactJobTitle"
            {...register("contactJobTitle", { required: "Job title is required" })}
            placeholder="Enter job title"
            className={cn(errors.contactJobTitle && "border-red-500")}
          />
          {errors.contactJobTitle && <p className="text-red-500 text-sm mt-1">{errors.contactJobTitle.message}</p>}
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">Billing Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="billingEmail">Billing Email</Label>
            <Input
              id="billingEmail"
              type="email"
              {...register("billingEmail", { 
                required: "Billing email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Enter billing email address"
              className={cn(errors.billingEmail && "border-red-500")}
            />
            {errors.billingEmail && <p className="text-red-500 text-sm mt-1">{errors.billingEmail.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="billingPhone">Billing Phone</Label>
            <Input
              id="billingPhone"
              {...register("billingPhone", { required: "Billing phone is required" })}
              placeholder="Enter billing phone number"
              className={cn(errors.billingPhone && "border-red-500")}
            />
            {errors.billingPhone && <p className="text-red-500 text-sm mt-1">{errors.billingPhone.message}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="paymentTerms">Payment Terms</Label>
          <Select 
            defaultValue="net30"
            onValueChange={(value) => setValue("paymentTerms", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="net15">Net 15 (15 days)</SelectItem>
              <SelectItem value="net30">Net 30 (30 days)</SelectItem>
              <SelectItem value="net45">Net 45 (45 days)</SelectItem>
              <SelectItem value="net60">Net 60 (60 days)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">Staffing Requirements</h3>
        </div>
        
        <div>
          <Label htmlFor="staffingNeeds">Staffing Needs</Label>
          <Select 
            onValueChange={(value) => setValue("staffingNeeds", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select staffing needs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="temp">Temporary Staff</SelectItem>
              <SelectItem value="temp-to-perm">Temp-to-Permanent</SelectItem>
              <SelectItem value="perm">Permanent Placement</SelectItem>
              <SelectItem value="seasonal">Seasonal Staff</SelectItem>
              <SelectItem value="on-demand">On-Demand Staff</SelectItem>
            </SelectContent>
          </Select>
          {errors.staffingNeeds && <p className="text-red-500 text-sm mt-1">{errors.staffingNeeds.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="staffingVolume">Expected Staffing Volume</Label>
            <Select 
              defaultValue="0-10"
              onValueChange={(value) => setValue("staffingVolume", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select volume" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-10">0-10 workers</SelectItem>
                <SelectItem value="11-25">11-25 workers</SelectItem>
                <SelectItem value="26-50">26-50 workers</SelectItem>
                <SelectItem value="51-100">51-100 workers</SelectItem>
                <SelectItem value="100+">100+ workers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
            <Input
              id="preferredStartDate"
              type="date"
              {...register("preferredStartDate")}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="additionalRequirements">Additional Requirements</Label>
          <Textarea
            id="additionalRequirements"
            {...register("additionalRequirements")}
            placeholder="Enter any additional requirements or notes"
            className="min-h-[80px]"
          />
        </div>
        
        <div className="flex items-start space-x-2 pt-4">
          <Checkbox 
            id="termsAgreement" 
            checked={termsAgreement}
            onCheckedChange={(checked) => {
              setValue("termsAgreement", checked === true);
            }}
          />
          <div>
            <Label 
              htmlFor="termsAgreement" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions
            </Label>
            <p className="text-sm text-gray-500 mt-1">
              By checking this box, I certify that I am authorized to represent the company and agree to the agency's terms of service.
            </p>
            {errors.termsAgreement && <p className="text-red-500 text-xs mt-1">{errors.termsAgreement.message}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !termsAgreement}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Onboarding..." : "Complete Onboarding"}
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
