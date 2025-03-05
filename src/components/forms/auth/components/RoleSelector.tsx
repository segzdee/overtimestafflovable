
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "./FormField";

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <FormField label="I am a">
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select account type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="company">Business (Hiring Staff)</SelectItem>
          <SelectItem value="agency">Staffing Agency</SelectItem>
          <SelectItem value="shift-worker">Shift Worker</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  );
}
