
import { RegisterForm } from "./RegisterForm";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RegisterFormAlerts } from "./RegisterFormAlerts";
import { checkPendingRegistrations, clearPendingRegistration } from "@/services/authService";
import { checkConnection } from "@/lib/robust-connection-handler";

interface RegisterFormWrapperProps {
  initialRole?: string | null;
}

export function RegisterFormWrapper({ initialRole }: RegisterFormWrapperProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hasPendingRegistration, setHasPendingRegistration] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  // Check for pending registrations on component mount
  useEffect(() => {
    const checkPending = async () => {
      const pendingRegistration = checkPendingRegistrations();
      if (pendingRegistration) {
        setHasPendingRegistration(true);
        setPendingData(pendingRegistration);
        
        // Check if we're online now to automatically retry
        const isOnline = await checkConnection();
        if (isOnline) {
          setNetworkError(false);
        } else {
          setNetworkError(true);
        }
      }
    };
    
    checkPending();
  }, []);

  const handleNetworkError = (formData: any) => {
    console.log("Network error detected, storing registration data for later", formData);
    setHasPendingRegistration(true);
    setPendingData(formData);
    setNetworkError(true);
  };

  const retryRegistration = () => {
    setNetworkError(false);
    setError(null);
    // The form will handle the retry with the existing data
  };
  
  const handleRegistrationSuccess = () => {
    setSuccess("Registration successful! You can now log in.");
    clearPendingRegistration();
    setHasPendingRegistration(false);
    setPendingData(null);
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
        onRegistrationSuccess={handleRegistrationSuccess}
        initialRole={initialRole || ""}
        pendingRegistration={pendingData}
      />
    </div>
  );
}
