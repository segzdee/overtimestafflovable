
import React from "react";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../PasswordInput";
import { FormField } from "./FormField";

interface PasswordFieldsProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}

export function PasswordFields({ 
  password, 
  confirmPassword, 
  onPasswordChange, 
  onConfirmPasswordChange 
}: PasswordFieldsProps) {
  return (
    <>
      <FormField label="Password">
        <PasswordInput 
          value={password}
          onChange={e => onPasswordChange(e.target.value)}
          placeholder="Create a password"
        />
      </FormField>

      <FormField label="Confirm Password">
        <Input 
          type="password" 
          placeholder="Confirm your password" 
          value={confirmPassword} 
          onChange={e => onConfirmPasswordChange(e.target.value)} 
          required 
          className="w-full" 
        />
      </FormField>
    </>
  );
}
