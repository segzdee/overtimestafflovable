
import { useState, useEffect, useCallback } from "react";
import { RegisterForm } from "./RegisterForm";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { Button } from "@/components/ui/button";
import { AlertCircle, Save, Cloud, CloudOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registrationService } from "@/lib/registration/registration-service";
import { checkConnection } from "@/lib/robust-connection-handler";

interface RegisterFormWrapperProps {
  initialRole?: string | null;
}

export function RegisterFormWrapper({ initialRole }: RegisterFormWrapperProps = {}) {
  const [hasPendingRegistration, setHasPendingRegistration] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();
  
  // Check if we're in production environment
  const isProduction = window.location.hostname === 'www.overtimestaff.com' || 
                      window.location.hostname === 'overtimestaff.com';

  // Check for pending registration on load
  useEffect(() => {
    const checkPendingRegistration = async () => {
      const hasPending = registrationService.hasPendingRegistration();
      setHasPendingRegistration(hasPending);
      
      // Try to process pending registration if we're online
      if (hasPending && navigator.onLine) {
        const isConnected = await checkConnection();
        if (isConnected) {
          processRegistration();
        }
      }
    };
    
    checkPendingRegistration();
  }, []);

  // Track online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkConnection().then(connected => {
        if (connected && hasPendingRegistration) {
          processRegistration();
        }
      });
    };
    
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [hasPendingRegistration]);

  // Process pending registration
  const processRegistration = useCallback(async () => {
    if (!hasPendingRegistration) return;
    
    try {
      toast({
        title: "Resuming Registration",
        description: "Attempting to complete your saved registration...",
      });
      
      const result = await registrationService.processPendingRegistration();
      
      if (result?.success) {
        setHasPendingRegistration(false);
        toast({
          title: "Registration Completed",
          description: "Your registration has been successfully completed",
          duration: 5000,
        });
      } else if (result) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: result.message || "Failed to process registration",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error processing registration:", error);
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        duration: 5000,
      });
    }
  }, [hasPendingRegistration, toast]);

  // Clear pending registration data
  const clearPendingRegistration = useCallback(() => {
    registrationService.clearPendingRegistration();
    setHasPendingRegistration(false);
  }, []);

  // Function to handle clicking the "Resume Registration" button
  const handleResumeRegistration = useCallback(() => {
    processRegistration();
  }, [processRegistration]);

  return (
    <div className="space-y-4">
      {/* Only show ConnectionStatus in non-production environments */}
      {!isProduction && <ConnectionStatus />}
      
      {/* Pending Registration Banner */}
      {hasPendingRegistration && (
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 mb-4">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <Save className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-800">Saved Registration</h3>
              <p className="mt-1 text-sm text-blue-700">
                We've saved your registration details locally. Would you like to continue with this registration?
              </p>
              
              <div className="mt-3 flex space-x-3">
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm"
                  className="bg-white border border-blue-200 hover:bg-blue-50"
                  disabled={!isOnline}
                  onClick={handleResumeRegistration}
                >
                  <Cloud className="h-4 w-4 mr-2" /> 
                  {isOnline ? "Resume Registration" : "Waiting for Connection..."}
                </Button>
                
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm"
                  className="bg-white border border-blue-200 hover:bg-blue-50"
                  onClick={clearPendingRegistration}
                >
                  <AlertCircle className="h-4 w-4 mr-2" /> 
                  Discard Saved Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warning for offline registration attempts - only show in non-production */}
      {!isOnline && !isProduction && !hasPendingRegistration && (
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 mb-4">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-amber-100 mr-3">
              <CloudOff className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-amber-800">Offline Mode</h3>
              <p className="mt-1 text-sm text-amber-700">
                You're currently offline. You can still fill out the form, and we'll save your data locally. 
                Your registration will be completed once your connection is restored.
              </p>
            </div>
          </div>
        </div>
      )}

      <RegisterForm 
        onNetworkError={(formData) => {
          setHasPendingRegistration(true);
        }}
        pendingRegistration={hasPendingRegistration ? registrationService.getPendingRegistration()?.data : null}
        onRegistrationSuccess={() => {
          setHasPendingRegistration(false);
        }}
        initialRole={initialRole}
      />
    </div>
  );
}
