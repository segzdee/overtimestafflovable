
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BankDetailsFormData } from "./BankDetailsSchema";

interface BankDetailsFieldsProps {
  form: UseFormReturn<BankDetailsFormData>;
}

export function BankDetailsFields({ form }: BankDetailsFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <FormField
        control={form.control}
        name="accountHolder"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Holder Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter the name on your account" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="bankName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bank Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your bank's name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="routingNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Routing Number</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter 9-digit routing number"
                maxLength={9}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="accountNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Number</FormLabel>
            <FormControl>
              <Input 
                type="password"
                placeholder="Enter your account number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="confirmAccountNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Account Number</FormLabel>
            <FormControl>
              <Input 
                type="password"
                placeholder="Re-enter your account number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
