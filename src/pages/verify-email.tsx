
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        
        if (!token || type !== 'signup') {
          setVerificationStatus('error');
          setErrorMessage("Invalid verification link. Please check your email and try again.");
          return;
        }

        // Check with Supabase if this token is valid
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });

        if (error) {
          console.error('Verification error:', error);
          setVerificationStatus('error');
          setErrorMessage(error.message || "Failed to verify email. The link may be expired.");
        } else {
          setVerificationStatus('success');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('error');
        setErrorMessage("An unexpected error occurred during verification.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Logo />
        </div>

        <div className="p-6 rounded-lg shadow-sm border bg-white text-center">
          {verificationStatus === 'loading' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Verifying Your Email</h2>
              <div className="flex justify-center my-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
              <p className="text-gray-600">Please wait while we verify your email...</p>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-4">Email Verified Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your email has been successfully verified. You can now log in to your account.
              </p>
              <Button 
                className="w-full text-stone-50 bg-violet-900 hover:bg-violet-800"
                onClick={() => navigate('/login')}
              >
                Proceed to Login
              </Button>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-4">Verification Failed</h2>
              <p className="text-red-600 mb-6">
                {errorMessage}
              </p>
              <div className="space-y-3">
                <Button 
                  className="w-full text-stone-50 bg-violet-900 hover:bg-violet-800"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/register')}
                >
                  Register Again
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
