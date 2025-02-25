import { Logo } from "@/components/ui/logo";
import { RegisterForm } from "@/components/forms/auth/RegisterForm";
export default function Register() {
  return <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Logo />
        </div>

        <div className="p-6 rounded-lg shadow-sm border bg-neutral-50">
          <h2 className="text-xl font-semibold text-center mb-1">Create Account</h2>
          <p className="text-center text-gray-600 mb-4 text-sm">Join OVERTIMESTAFF</p>
          
          <RegisterForm />
          
          <p className="mt-3 text-xs text-center text-slate-700">
            After registering, you'll receive a verification email. Please check your inbox and click the verification link to complete your registration.
          </p>
        </div>
      </div>
    </div>;
}