
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegistrationSuccess() {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="p-6 rounded-lg shadow-sm border bg-neutral-50 text-center">
          <div className="bg-green-100 p-4 rounded-full mx-auto w-20 h-20 flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
          
          <p className="text-gray-600 mb-6">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
          
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Mail className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              After verification, you'll be able to log in and complete your profile setup.
            </AlertDescription>
          </Alert>
          
          <Button 
            onClick={() => navigate("/login")}
            className="w-full text-stone-50 bg-violet-900 hover:bg-violet-800"
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
