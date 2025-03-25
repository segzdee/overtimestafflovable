
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { BankDetailsFormData } from "./BankDetailsSchema";

interface AccountTypeSelectorProps {
  form: UseFormReturn<BankDetailsFormData>;
}

export function AccountTypeSelector({ form }: AccountTypeSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="accountType"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Account Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="checking" id="checking" />
                <Label htmlFor="checking">Checking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="savings" id="savings" />
                <Label htmlFor="savings">Savings</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
