
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RegistrationFooterProps {
  loading: boolean;
}

export function RegistrationFooter({ loading }: RegistrationFooterProps) {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full text-stone-50 bg-violet-900 hover:bg-violet-800"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Button 
          variant="link" 
          className="p-0 h-auto font-normal text-primary hover:text-primary/90" 
          onClick={() => navigate("/login")}
          type="button"
        >
          Sign in
        </Button>
      </p>
    </>
  );
}
