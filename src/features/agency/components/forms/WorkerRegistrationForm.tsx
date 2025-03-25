
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CheckCircle, CalendarIcon, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface WorkerRegistrationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type WorkerRegistrationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  jobTitle: string;
  skills: string[];
  experienceYears: number;
  hourlyRate: number;
  availability: string;
  photo?: FileList;
  resume?: FileList;
  backgroundCheckConsent: boolean;
  termsAgreement: boolean;
};

export function WorkerRegistrationForm({ onSuccess, onCancel }: WorkerRegistrationFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<WorkerRegistrationFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      jobTitle: "",
      skills: [],
      experienceYears: 0,
      hourlyRate: 15,
      availability: "full-time",
      backgroundCheckConsent: false,
      termsAgreement: false
    }
  });
  
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const backgroundCheckConsent = watch("backgroundCheckConsent");
  const termsAgreement = watch("termsAgreement");
  
  const skillOptions = [
    { id: "forklift", label: "Forklift Operation" },
    { id: "warehouse", label: "Warehouse Management" },
    { id: "customer-service", label: "Customer Service" },
    { id: "admin", label: "Administrative Work" },
    { id: "delivery", label: "Delivery" },
    { id: "food-service", label: "Food Service" },
    { id: "retail", label: "Retail" },
    { id: "cleaning", label: "Cleaning" },
    { id: "security", label: "Security" }
  ];

  const onSubmit = async (data: WorkerRegistrationFormData) => {
    if (!dateOfBirth) {
      toast({
        variant: "destructive",
        title: "Date of birth is required",
        description: "Please select your date of birth."
      });
      return;
    }
    
    setIsLoading(true);
    data.dateOfBirth = dateOfBirth;
    
    try {
      // In a real implementation, this would call the API to register the worker
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Worker registered",
        description: "The worker has been registered successfully."
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
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
        <h3 className="text-lg font-medium">Worker Registered Successfully</h3>
        <p className="text-sm text-gray-600">
          {watch("firstName")} {watch("lastName")} has been added to your worker roster.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          View Worker Roster
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              placeholder="Enter first name"
              className={cn(errors.firstName && "border-red-500")}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Enter last name"
              className={cn(errors.lastName && "border-red-500")}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Enter email address"
              className={cn(errors.email && "border-red-500")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
              placeholder="Enter phone number"
              className={cn(errors.phone && "border-red-500")}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateOfBirth ? format(dateOfBirth, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  onSelect={setDateOfBirth}
                  initialFocus
                  disabled={(date) => date > new Date() || date < new Date("1940-01-01")}
                />
              </PopoverContent>
            </Popover>
            {!dateOfBirth && <p className="text-red-500 text-sm mt-1">Date of birth is required</p>}
          </div>
          
          <div>
            <Label htmlFor="photo">Profile Photo</Label>
            <Input
              id="photo"
              type="file"
              {...register("photo")}
              accept="image/*"
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">Optional: Upload a professional photo</p>
          </div>
        </div>
        
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address", { required: "Address is required" })}
            placeholder="Enter street address"
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
        
        <hr className="my-6" />
        <h3 className="text-lg font-medium">Employment Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="jobTitle">Desired Job Title</Label>
            <Input
              id="jobTitle"
              {...register("jobTitle", { required: "Job title is required" })}
              placeholder="e.g., Warehouse Associate"
              className={cn(errors.jobTitle && "border-red-500")}
            />
            {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="availability">Availability</Label>
            <Select 
              defaultValue="full-time" 
              onValueChange={(value) => setValue("availability", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="weekends">Weekends Only</SelectItem>
                <SelectItem value="evenings">Evenings Only</SelectItem>
                <SelectItem value="on-call">On Call</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="experienceYears">Years of Experience</Label>
            <Input
              id="experienceYears"
              type="number"
              min="0"
              step="1"
              {...register("experienceYears", { 
                required: "Years of experience is required",
                min: { value: 0, message: "Cannot be negative" }
              })}
              className={cn(errors.experienceYears && "border-red-500")}
            />
            {errors.experienceYears && <p className="text-red-500 text-sm mt-1">{errors.experienceYears.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="hourlyRate">Desired Hourly Rate ($)</Label>
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
          <Label>Skills</Label>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {skillOptions.map(skill => (
              <div key={skill.id} className="flex items-center space-x-2">
                <Checkbox id={skill.id} value={skill.id} {...register("skills")} />
                <Label htmlFor={skill.id} className="font-normal">{skill.label}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="resume">Resume / CV</Label>
          <Input
            id="resume"
            type="file"
            {...register("resume")}
            accept=".pdf,.doc,.docx"
            className="cursor-pointer"
          />
          <p className="text-sm text-gray-500 mt-1">Upload your resume or CV (PDF, DOC, DOCX)</p>
        </div>
        
        <hr className="my-6" />
        <h3 className="text-lg font-medium">Agreements</h3>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="backgroundCheckConsent" 
            checked={backgroundCheckConsent}
            onCheckedChange={(checked) => {
              setValue("backgroundCheckConsent", checked === true);
            }}
          />
          <div>
            <Label 
              htmlFor="backgroundCheckConsent" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I consent to a background check
            </Label>
            <p className="text-sm text-gray-500 mt-1">
              I understand and agree that the agency may conduct a background check as part of the employment process.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
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
              By checking this box, I certify that the information provided is accurate and I agree to the agency's terms and conditions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !dateOfBirth || !backgroundCheckConsent || !termsAgreement}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Registering..." : "Register Worker"}
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
