
import { Logo } from "@/components/ui/logo";
import { RegisterForm } from "@/components/forms/auth/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
          <p className="text-center text-gray-600 mb-6">Join OVERTIMESTAFF</p>
          
          <RegisterForm />
          
          <p className="mt-4 text-sm text-center text-gray-500">
            After registering, you'll receive a verification email. Please check your inbox and click the verification link to complete your registration.
          </p>
        </div>
      </div>
    </div>
  );
}
