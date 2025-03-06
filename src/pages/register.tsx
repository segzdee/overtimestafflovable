
import { Logo } from "@/components/ui/logo";
import { RegisterFormWrapper } from "@/components/forms/auth/RegisterFormWrapper";
import { Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RegisterFormSkeleton } from "@/components/forms/auth/RegisterFormSkeleton";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

export default function Register() {
  const { userType } = useParams<{ userType?: string }>();
  const [initialRole, setInitialRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Set initial role based on URL parameter if available
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    if (userType) {
      // Map URL parameter to role value
      const roleMap: Record<string, string> = {
        'business': 'company',
        'agency': 'agency',
        'worker': 'shift-worker'
      };
      
      if (userType in roleMap) {
        setInitialRole(roleMap[userType]);
      }
    }
    
    return () => clearTimeout(timer);
  }, [userType]);

  return (
    <ErrorBoundary>
      <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Logo />
          </div>

          <div className="p-6 rounded-lg shadow-sm border bg-neutral-50">
            <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>
            <p className="text-center text-gray-600 mb-4 text-sm">Join OVERTIMESTAFF</p>
            
            <Alert className="mb-4 bg-blue-50 border-blue-200">
              <Mail className="h-4 w-4 mr-2 text-blue-600" />
              <AlertDescription className="text-blue-700">
                After registering, you'll receive a verification email. Please check your inbox and click the verification link to complete your registration.
              </AlertDescription>
            </Alert>
            
            {isLoading ? (
              <RegisterFormSkeleton />
            ) : (
              <RegisterFormWrapper initialRole={initialRole} />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
