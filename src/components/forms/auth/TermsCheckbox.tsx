
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

export interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onCheckedChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="terms" 
        checked={checked}
        onCheckedChange={onCheckedChange} 
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I agree to the{' '}
        <a href="/terms" className="text-indigo-600 hover:underline">
          Terms and Conditions
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-indigo-600 hover:underline">
          Privacy Policy
        </a>
      </label>
    </div>
  );
};
