
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsCheckboxProps {
  agreedToTerms: boolean;
  onAgreedToTermsChange: (checked: boolean) => void;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  agreedToTerms,
  onAgreedToTermsChange
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="terms" 
        checked={agreedToTerms} 
        onCheckedChange={checked => onAgreedToTermsChange(checked as boolean)} 
      />
      <label htmlFor="terms" className="text-sm text-gray-600">
        I agree to the{" "}
        <a href="/terms" className="text-primary hover:underline">Terms</a>
        {" "}and{" "}
        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
      </label>
    </div>
  );
};
