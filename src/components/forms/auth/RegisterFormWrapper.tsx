
import { RegisterForm } from "./RegisterForm";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RegisterFormAlerts } from "./RegisterFormAlerts";
import { RegistrationService } from "@/lib/registration/registration-service";
import { useAuthHooks } from "@/hooks/useAuthHooks";

interface RegisterFormWrapperProps {
  initialRole?: string | null;
}

export function RegisterFormWrapper({ initialRole }: RegisterFormWrapperProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hasPendingRegistration, setHasPendingRegistration] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const authHooks = useAuthHooks();
  const [registrationService] = useState(() => {
    const service = new RegistrationService();
    return service;
  });
  
  // Initialize registration service with hooks
  useEffect(() => {
    registrationService.setAuthHooks(authHooks);
    
    // Check for pending registrations
    const pendingRegistration = registrationService.getPendingRegistration();
    setHasPendingRegistration(!!pendingRegistration);
    
    // Process pending registration if online
    if (pendingRegistration) {
      const processPending = async () => {
        const result = await registrationService.processPendingRegistration();
        if (result && result.success) {
          setSuccess(result.message);
          setHasPendingRegistration(false);
        }
      };
      
      processPending();
    }
  }, [registrationService, authHooks]);

  const handleRegister = async (formData: any) => {
    setError(null);
    setSuccess(null);
    setNetworkError(false);
    
    try {
      const result = await registrationService.register(formData);
      
      if (result.success) {
        setSuccess(result.message);
        // Check if we need to show a pending registration message
        setHasPendingRegistration(registrationService.hasPendingRegistration());
      } else {
        setError(result.message);
        
        // Monitor failed registration
        await authHooks.monitorFailedRegistration(
          formData.email,
          result.message
        );
        
        // Send diagnostic
        await authHooks.sendAuthDiagnostic(
          'registration_failed',
          null,
          { 
            email: formData.email, 
            role: formData.role,
            error: result.message 
          }
        );
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      // Check if it's a network error
      if (error instanceof Error && 
          (errorMessage.includes('network') || 
           errorMessage.includes('connection') || 
           errorMessage.includes('offline'))) {
        setNetworkError(true);
      } else {
        setError(errorMessage);
      }
      
      // Log and monitor the error
      console.error('Registration error:', error);
      await authHooks.monitorFailedRegistration(
        formData.email,
        errorMessage
      );
    }
  };

  const retryRegistration = () => {
    setNetworkError(false);
    setError(null);
    // We don't have access to the form data here, so this is a placeholder
    // The actual retry logic will need to be handled in the form component
  };

  const handleNetworkError = (formData: any) => {
    // This will be called by the RegisterForm when it detects a network error
    // Store the registration data for later processing
    console.log("Network error detected, storing registration data for later", formData);
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
        pendingRegistration={registrationService.getPendingRegistration()}
        onRegistrationSuccess={() => setSuccess("Registration successful! Please check your email to verify your account.")}
        initialRole={initialRole || ""}
      />
    </div>
  );
}
