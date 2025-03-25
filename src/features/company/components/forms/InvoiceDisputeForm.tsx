
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface InvoiceDisputeFormProps {
  invoiceNumber?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

type InvoiceDisputeFormData = {
  invoiceNumber: string;
  disputeReason: string;
  disputeType: "amount" | "service" | "staff" | "other";
  description: string;
  suggestedResolution: string;
  claimedAmount?: number;
  uploadEvidence: boolean;
  evidenceFiles?: FileList;
  contactPreference: "email" | "phone";
  agreeToTerms: boolean;
};

export function InvoiceDisputeForm({ 
  invoiceNumber = "", 
  onSuccess, 
  onCancel 
}: InvoiceDisputeFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<InvoiceDisputeFormData>({
    defaultValues: {
      invoiceNumber,
      disputeReason: "",
      disputeType: "amount",
      description: "",
      suggestedResolution: "",
      uploadEvidence: false,
      contactPreference: "email",
      agreeToTerms: false
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const uploadEvidence = watch("uploadEvidence");
  const disputeType = watch("disputeType");
  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: InvoiceDisputeFormData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the API to submit the dispute
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Dispute submitted",
        description: "Your invoice dispute has been submitted successfully."
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to submit dispute",
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
        <h3 className="text-lg font-medium">Dispute Submitted</h3>
        <p className="text-sm text-gray-600">
          Your dispute for invoice #{watch("invoiceNumber")} has been submitted. 
          We will review your case and get back to you within 2-3 business days.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          Return to Invoices
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            id="invoiceNumber"
            {...register("invoiceNumber", { required: "Invoice number is required" })}
            placeholder="Enter invoice number"
            className={cn(errors.invoiceNumber && "border-red-500")}
            disabled={!!invoiceNumber}
          />
          {errors.invoiceNumber && <p className="text-red-500 text-sm mt-1">{errors.invoiceNumber.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="disputeType">Dispute Type</Label>
          <Select 
            defaultValue="amount" 
            onValueChange={(value) => setValue("disputeType", value as "amount" | "service" | "staff" | "other")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select dispute type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amount">Incorrect Amount</SelectItem>
              <SelectItem value="service">Service Not Provided</SelectItem>
              <SelectItem value="staff">Staff Performance Issue</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {disputeType === "amount" && (
          <div>
            <Label htmlFor="claimedAmount">Claimed Amount ($)</Label>
            <Input
              id="claimedAmount"
              type="number"
              step="0.01"
              min="0"
              {...register("claimedAmount", { 
                required: "Claimed amount is required for amount disputes",
                min: { value: 0, message: "Amount must be a positive number" }
              })}
              placeholder="Enter the amount you believe is correct"
              className={cn(errors.claimedAmount && "border-red-500")}
            />
            {errors.claimedAmount && <p className="text-red-500 text-sm mt-1">{errors.claimedAmount.message}</p>}
          </div>
        )}
        
        <div>
          <Label htmlFor="disputeReason">Dispute Reason</Label>
          <Input
            id="disputeReason"
            {...register("disputeReason", { required: "Dispute reason is required" })}
            placeholder="Brief summary of the issue"
            className={cn(errors.disputeReason && "border-red-500")}
          />
          {errors.disputeReason && <p className="text-red-500 text-sm mt-1">{errors.disputeReason.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="description">Detailed Description</Label>
          <Textarea
            id="description"
            {...register("description", { required: "Detailed description is required" })}
            placeholder="Please provide a detailed explanation of the dispute"
            className={cn("min-h-[120px]", errors.description && "border-red-500")}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="suggestedResolution">Suggested Resolution</Label>
          <Textarea
            id="suggestedResolution"
            {...register("suggestedResolution", { required: "Suggested resolution is required" })}
            placeholder="What would you consider a fair resolution?"
            className={cn("min-h-[80px]", errors.suggestedResolution && "border-red-500")}
          />
          {errors.suggestedResolution && <p className="text-red-500 text-sm mt-1">{errors.suggestedResolution.message}</p>}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="uploadEvidence" 
              checked={uploadEvidence}
              onCheckedChange={(checked) => {
                setValue("uploadEvidence", checked === true);
              }}
            />
            <Label htmlFor="uploadEvidence" className="font-normal">I want to upload supporting evidence</Label>
          </div>
          
          {uploadEvidence && (
            <div className="pt-2">
              <Label htmlFor="evidenceFiles">Upload Files</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="evidenceFiles"
                      className="relative cursor-pointer rounded-md font-medium text-violet-600 hover:text-violet-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-violet-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="evidenceFiles"
                        type="file"
                        className="sr-only"
                        multiple
                        {...register("evidenceFiles")}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF up to 10MB each
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <Label>Preferred Contact Method</Label>
          <RadioGroup 
            defaultValue="email"
            onValueChange={(value) => setValue("contactPreference", value as "email" | "phone")}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email" className="font-normal">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone" className="font-normal">Phone</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex items-start space-x-2 pt-4">
          <Checkbox 
            id="agreeToTerms" 
            checked={agreeToTerms}
            onCheckedChange={(checked) => {
              setValue("agreeToTerms", checked === true);
            }}
          />
          <div>
            <Label 
              htmlFor="agreeToTerms" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I confirm this dispute is made in good faith
            </Label>
            <p className="text-sm text-gray-500 mt-1">
              By submitting this dispute, I certify that the information provided is accurate and truthful.
            </p>
            {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms.message}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !agreeToTerms}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Submitting..." : "Submit Dispute"}
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
