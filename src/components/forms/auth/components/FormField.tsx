
import React, { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium text-gray-700">{label}</Label>
      {children}
    </div>
  );
}
