
import { Logo } from "@/components/ui/logo";
import { RegisterForm } from "@/components/forms/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  
  return <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Logo />
        </div>

        <div className="p-6 rounded-lg shadow-sm border bg-neutral-50">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h2 className="text-xl font-semibold text-center flex-1 mr-6">Create Account</h2>
          </div>
          <p className="text-center text-gray-600 mb-4 text-sm">Join OVERTIMESTAFF</p>
          
          <RegisterForm />
          
          <p className="mt-3 text-xs text-center text-slate-700">
            After registering, you'll receive a verification email. Please check your inbox and click the verification link to complete your registration.
          </p>
        </div>
      </div>
    </div>;
}
