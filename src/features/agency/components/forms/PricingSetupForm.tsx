
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Plus, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface PricingSetupFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type PricingSetupFormData = {
  pricingModel: "markup" | "flat-rate" | "tiered";
  markupPercentage?: number;
  flatRateAmount?: number;
  tieredPricing?: {
    tier: string;
    minimumHours: number;
    rate: number;
  }[];
  currency: string;
  minimumBillableHours: number;
  cancellationFee: number;
  specialRates: {
    name: string;
    rate: number;
    description: string;
  }[];
  invoicingFrequency: "weekly" | "bi-weekly" | "monthly";
  paymentTerms: "net15" | "net30" | "net45" | "net60";
  additionalNotes: string;
  activateImmediately: boolean;
};

export function PricingSetupForm({ onSuccess, onCancel }: PricingSetupFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PricingSetupFormData>({
    defaultValues: {
      pricingModel: "markup",
      markupPercentage: 25,
      currency: "USD",
      minimumBillableHours: 4,
      cancellationFee: 50,
      specialRates: [],
      invoicingFrequency: "weekly",
      paymentTerms: "net30",
      additionalNotes: "",
      activateImmediately: true
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const pricingModel = watch("pricingModel");
  const specialRates = watch("specialRates") || [];
  const activateImmediately = watch("activateImmediately");
  
  const addSpecialRate = () => {
    const currentSpecialRates = watch("specialRates") || [];
    setValue("specialRates", [
      ...currentSpecialRates,
      { name: "", rate: 0, description: "" }
    ]);
  };
  
  const removeSpecialRate = (index: number) => {
    const currentSpecialRates = watch("specialRates") || [];
    setValue("specialRates", currentSpecialRates.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PricingSetupFormData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the API to set up pricing
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Pricing setup completed",
        description: "Your pricing structure has been set up successfully."
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Setup failed",
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
        <h3 className="text-lg font-medium">Pricing Setup Complete</h3>
        <p className="text-sm text-gray-600">
          Your pricing structure has been saved and {activateImmediately ? "is now active" : "will be activated upon review"}.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          Go to Settings
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Pricing Model</Label>
          <RadioGroup 
            defaultValue="markup"
            value={pricingModel}
            onValueChange={(value) => setValue("pricingModel", value as "markup" | "flat-rate" | "tiered")}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="markup" id="markup" />
              <Label htmlFor="markup" className="font-normal">Markup (Percentage)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flat-rate" id="flat-rate" />
              <Label htmlFor="flat-rate" className="font-normal">Flat Rate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tiered" id="tiered" />
              <Label htmlFor="tiered" className="font-normal">Tiered Pricing</Label>
            </div>
          </RadioGroup>
        </div>
        
        {pricingModel === "markup" && (
          <div>
            <Label htmlFor="markupPercentage">Markup Percentage (%)</Label>
            <Input
              id="markupPercentage"
              type="number"
              step="0.1"
              min="0"
              {...register("markupPercentage", { 
                required: "Markup percentage is required",
                min: { value: 0, message: "Percentage must be a positive number" }
              })}
              className={cn(errors.markupPercentage && "border-red-500")}
            />
            {errors.markupPercentage && <p className="text-red-500 text-sm mt-1">{errors.markupPercentage.message}</p>}
            <p className="text-sm text-gray-500 mt-1">Example: 25% markup on worker's hourly rate</p>
          </div>
        )}
        
        {pricingModel === "flat-rate" && (
          <div>
            <Label htmlFor="flatRateAmount">Flat Rate (per hour)</Label>
            <Input
              id="flatRateAmount"
              type="number"
              step="0.01"
              min="0"
              {...register("flatRateAmount", { 
                required: "Flat rate amount is required",
                min: { value: 0, message: "Rate must be a positive number" }
              })}
              className={cn(errors.flatRateAmount && "border-red-500")}
            />
            {errors.flatRateAmount && <p className="text-red-500 text-sm mt-1">{errors.flatRateAmount.message}</p>}
            <p className="text-sm text-gray-500 mt-1">Fixed hourly rate charged to clients regardless of worker pay</p>
          </div>
        )}
        
        {pricingModel === "tiered" && (
          <div className="space-y-3">
            <Label>Tiered Pricing Structure</Label>
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-gray-50">
                <div className="grid grid-cols-3 gap-2 font-medium text-sm pb-2">
                  <span>Tier</span>
                  <span>Min. Hours</span>
                  <span>Rate</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Tier 1" />
                  <Input type="number" min="0" placeholder="0" />
                  <Input type="number" min="0" step="0.01" placeholder="25.00" />
                </div>
              </div>
              <div className="border rounded-md p-3 bg-gray-50">
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Tier 2" />
                  <Input type="number" min="0" placeholder="40" />
                  <Input type="number" min="0" step="0.01" placeholder="22.50" />
                </div>
              </div>
              <div className="border rounded-md p-3 bg-gray-50">
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Tier 3" />
                  <Input type="number" min="0" placeholder="80" />
                  <Input type="number" min="0" step="0.01" placeholder="20.00" />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tier
              </Button>
              <p className="text-sm text-gray-500">Rates decrease as hour volume increases</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select 
              defaultValue="USD" 
              onValueChange={(value) => setValue("currency", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="CAD">CAD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="AUD">AUD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="minimumBillableHours">Minimum Billable Hours</Label>
            <Input
              id="minimumBillableHours"
              type="number"
              min="0"
              step="0.5"
              {...register("minimumBillableHours", { 
                required: "Minimum billable hours is required",
                min: { value: 0, message: "Hours must be a positive number" }
              })}
              className={cn(errors.minimumBillableHours && "border-red-500")}
            />
            {errors.minimumBillableHours && <p className="text-red-500 text-sm mt-1">{errors.minimumBillableHours.message}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="cancellationFee">Cancellation Fee</Label>
          <Input
            id="cancellationFee"
            type="number"
            min="0"
            step="0.01"
            {...register("cancellationFee", { 
              required: "Cancellation fee is required",
              min: { value: 0, message: "Fee must be a positive number" }
            })}
            className={cn(errors.cancellationFee && "border-red-500")}
          />
          {errors.cancellationFee && <p className="text-red-500 text-sm mt-1">{errors.cancellationFee.message}</p>}
          <p className="text-sm text-gray-500 mt-1">Fee charged for last-minute cancellations (within 24 hours)</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Special Rates</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSpecialRate}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Rate
            </Button>
          </div>
          
          {specialRates.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No special rates configured</p>
          ) : (
            <div className="space-y-4">
              {specialRates.map((rate, index) => (
                <div key={index} className="border rounded-md p-3 relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-7 w-7 p-0 text-gray-500 hover:text-red-500"
                    onClick={() => removeSpecialRate(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Rate Name</Label>
                      <Input
                        {...register(`specialRates.${index}.name` as const, { required: "Name is required" })}
                        placeholder="e.g., Holiday Rate"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Rate Amount</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(`specialRates.${index}.rate` as const, { required: "Rate is required" })}
                        placeholder="0.00"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <Label className="text-xs">Description</Label>
                    <Input
                      {...register(`specialRates.${index}.description` as const)}
                      placeholder="When this rate applies"
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="invoicingFrequency">Invoicing Frequency</Label>
            <Select 
              defaultValue="weekly" 
              onValueChange={(value) => setValue("invoicingFrequency", value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <Select 
              defaultValue="net30" 
              onValueChange={(value) => setValue("paymentTerms", value as any)}
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
        </div>
        
        <div>
          <Label htmlFor="additionalNotes">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            {...register("additionalNotes")}
            placeholder="Any additional information about pricing structure"
            className="min-h-[80px]"
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="activateImmediately" 
            checked={activateImmediately}
            onCheckedChange={(checked) => {
              setValue("activateImmediately", checked === true);
            }}
          />
          <Label htmlFor="activateImmediately" className="font-normal">
            Activate this pricing structure immediately
          </Label>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          {isLoading ? "Saving..." : "Save Pricing Structure"}
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
