
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/lib/supabase/client";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [verifying, setVerifying] = useState(true);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const type = searchParams.get("type");

      if (!token || !type) {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: "Invalid verification link."
        });
        setVerifying(false);
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type as any
        });

        if (error) throw error;

        toast({
          title: "Email Verified",
          description: "Your email has been successfully verified."
        });
        
        // Navigate to dashboard after successful verification
        navigate("/dashboard");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: error instanceof Error ? error.message : "An error occurred"
        });
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate, toast]);

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email
      });

      if (error) throw error;

      toast({
        title: "Verification Email Sent",
        description: "Please check your inbox for the verification link."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to resend verification email"
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Email Verification
          </h2>
          
          {verifying ? (
            <div className="text-center">
              <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4" />
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-gray-600">
                {user?.email ? (
                  <>
                    We sent a verification link to <br />
                    <span className="font-medium">{user.email}</span>
                  </>
                ) : (
                  "Please verify your email to continue"
                )}
              </p>

              <Button
                onClick={handleResendVerification}
                variant="outline"
                className="w-full"
                disabled={resending}
              >
                {resending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </Button>

              <Button
                onClick={() => navigate("/login")}
                variant="link"
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
