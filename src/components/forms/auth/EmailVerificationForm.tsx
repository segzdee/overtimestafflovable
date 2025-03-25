
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmailVerificationFormProps {
  email?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EmailVerificationForm({ 
  email: initialEmail = "", 
  onSuccess, 
  onCancel 
}: EmailVerificationFormProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the API to verify the code
      // For demo purposes, we'll simulate a successful verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (verificationCode === "123456") {
        setIsSuccess(true);
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        });
        if (onSuccess) onSuccess();
      } else {
        throw new Error("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to verify email");
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error instanceof Error ? error.message : "Failed to verify email",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the API to resend the code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Verification code sent",
        description: `A new verification code has been sent to ${email}`,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send verification code");
      toast({
        variant: "destructive",
        title: "Failed to send code",
        description: error instanceof Error ? error.message : "Failed to send verification code",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="text-lg font-medium">Email Verified</h3>
        <p className="text-sm text-gray-600">
          Your email address has been successfully verified.
        </p>
        <Button 
          onClick={onSuccess} 
          className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">Verify Your Email</h3>
        <p className="text-sm text-gray-600">
          We've sent a verification code to {email || "your email"}. Please enter it below.
        </p>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!initialEmail && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
              required
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <Input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-violet-900 hover:bg-violet-800 text-stone-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
          
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              disabled={isLoading}
              onClick={resendVerificationCode}
              className="text-violet-600 hover:text-violet-500 p-0 h-auto"
            >
              Resend Code
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="link"
                disabled={isLoading}
                onClick={onCancel}
                className="text-gray-600 hover:text-gray-500 p-0 h-auto"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
