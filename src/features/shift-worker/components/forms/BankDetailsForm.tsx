
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";
import { bankDetailsSchema, BankDetailsFormData } from "./bank-details/BankDetailsSchema";
import { AccountTypeSelector } from "./bank-details/AccountTypeSelector";
import { BankDetailsFields } from "./bank-details/BankDetailsFields";
import { SecurityMessage } from "./bank-details/SecurityMessage";

interface BankDetailsFormProps {
  onSuccess?: () => void;
}

export function BankDetailsForm({ onSuccess }: BankDetailsFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      accountType: "checking",
      accountHolder: "",
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      confirmAccountNumber: ""
    }
  });
  
  const onSubmit = async (data: BankDetailsFormData) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Bank details saved",
        description: "Your payment information has been securely stored."
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save",
        description: error instanceof Error ? error.message : "An error occurred while saving your bank details"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Payment Information
        </CardTitle>
        <CardDescription>
          Enter your bank account details for receiving payments. Your information is encrypted and secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AccountTypeSelector form={form} />
            <BankDetailsFields form={form} />
            
            <div className="space-y-4">
              <SecurityMessage />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Bank Details"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
