
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean; // Add disabled prop
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = "Enter password",
  required = true,
  disabled = false // Add default value
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative">
      <Input 
        type={showPassword ? "text" : "password"} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        required={required}
        disabled={disabled} // Pass the disabled prop to Input
        className="w-full pr-10" 
      />
      <button 
        type="button" 
        onClick={() => setShowPassword(!showPassword)} 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        disabled={disabled} // Also disable the eye button when the input is disabled
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};
