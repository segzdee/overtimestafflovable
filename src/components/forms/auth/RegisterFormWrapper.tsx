
import { useState, useEffect, useCallback } from "react";
import { RegisterForm } from "./RegisterForm";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { Button } from "@/components/ui/button";
import { AlertCircle, Save, Cloud, CloudOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LOCAL_STORAGE_KEY = "overtimestaff_pending_registration";

interface RegisterFormWrapperProps {
  initialRole?: string | null;
}

export function RegisterFormWrapper({ initialRole }: RegisterFormWrapperProps = {}) {
  const [hasPendingRegistration, setHasPendingRegistration] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  // Track online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check for pending registration on load
  useEffect(() => {
    const pendingData = localStorage.getItem(LOCAL_STORAGE_KEY);
    setHasPendingRegistration(!!pendingData);
  }, []);

  // Save registration data to local storage if submission fails due to connection
  const saveRegistrationLocally = useCallback((formData) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        formData,
        timestamp: new Date().toISOString()
      }));
      setHasPendingRegistration(true);
      
      toast({
        title: "Registration Saved",
        description: "We'll complete your registration when connection is restored",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error saving registration data locally:", error);
    }
  }, [toast]);

  // Clear pending registration data
  const clearPendingRegistration = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setHasPendingRegistration(false);
  }, []);

  // Submit pending registration when back online
  const submitPendingRegistration = useCallback(() => {
    try {
      const pendingDataStr = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!pendingDataStr) return;

      const { formData } = JSON.parse(pendingDataStr);
      
      // We don't immediately remove the data in case submission fails again
      // This happens in the registration form's onSuccess callback

      toast({
        title: "Resuming Registration",
        description: "Attempting to complete your saved registration...",
      });
      
      return formData;
    } catch (error) {
      console.error("Error processing pending registration:", error);
      // If we can't parse the data, clear it
      clearPendingRegistration();
      return null;
    }
  }, [toast, clearPendingRegistration]);

  // Function to handle clicking the "Resume Registration" button
  const handleResumeRegistration = useCallback(() => {
    // Just need to set pendingRegistration state to trigger the form update
    // The actual data retrieval happens in submitPendingRegistration
    if (isOnline && hasPendingRegistration) {
      // Force a refresh of the pendingRegistration by clearing and setting it again
      setHasPendingRegistration(false);
      setTimeout(() => setHasPendingRegistration(true), 0);
    }
  }, [isOnline, hasPendingRegistration]);

  return (
    <div className="space-y-4">
      <ConnectionStatus />
      
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

      {/* Warning for offline registration attempts */}
      {!isOnline && !hasPendingRegistration && (
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
        onNetworkError={saveRegistrationLocally}
        pendingRegistration={hasPendingRegistration ? submitPendingRegistration() : null}
        onRegistrationSuccess={clearPendingRegistration}
        initialRole={initialRole}
      />
    </div>
  );
}
