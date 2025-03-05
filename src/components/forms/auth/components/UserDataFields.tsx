
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";

interface UserDataFieldsProps {
  name: string;
  email: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

export function UserDataFields({ 
  name, 
  email, 
  onNameChange, 
  onEmailChange 
}: UserDataFieldsProps) {
  return (
    <>
      <FormField label="Name">
        <Input 
          type="text" 
          placeholder="Enter your full name" 
          value={name} 
          onChange={e => onNameChange(e.target.value)} 
          required 
          className="w-full" 
        />
      </FormField>

      <FormField label="Email">
        <Input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={e => onEmailChange(e.target.value)} 
          required 
          className="w-full" 
        />
      </FormField>
    </>
  );
}
