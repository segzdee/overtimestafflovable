
import { RegisterForm } from "./RegisterForm";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RegisterFormAlerts } from "./RegisterFormAlerts";

interface RegisterFormWrapperProps {
  initialRole?: string | null;
}

export function RegisterFormWrapper({ initialRole }: RegisterFormWrapperProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hasPendingRegistration, setHasPendingRegistration] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const handleNetworkError = (formData: any) => {
    // This will be called by the RegisterForm when it detects a network error
    console.log("Network error detected, storing registration data for later", formData);
    // In the simplified version, we're not actually storing this data persistently
  };

  const retryRegistration = () => {
    setNetworkError(false);
    setError(null);
    // We don't have access to the form data here, so this is a placeholder
  };

  return (
    <div>
      {hasPendingRegistration && (
        <Alert className="mb-4 bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 mr-2 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            You have a pending registration that will be completed when your internet connection is restored.
          </AlertDescription>
        </Alert>
      )}
      
      <RegisterFormAlerts 
        error={error || ""}
        networkError={networkError}
        successMessage={success || ""}
        retryRegistration={retryRegistration}
      />
      
      <RegisterForm 
        onNetworkError={handleNetworkError}
        onRegistrationSuccess={() => setSuccess("Registration successful! You can now log in.")}
        initialRole={initialRole || ""}
      />
    </div>
  );
}
