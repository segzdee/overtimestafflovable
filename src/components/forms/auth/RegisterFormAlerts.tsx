
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail, Wifi, WifiOff } from "lucide-react";

interface RegisterFormAlertsProps {
  error: string;
  networkError: boolean;
  successMessage: string;
  retryRegistration: () => void;
}

export const RegisterFormAlerts: React.FC<RegisterFormAlertsProps> = ({
  error,
  networkError,
  successMessage,
  retryRegistration
}) => {
  return (
    <>
      {successMessage && (
        <Alert className="bg-green-50 border-green-200">
          <Mail className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Email Verification Required</AlertTitle>
          <AlertDescription className="text-green-700">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {networkError && (
        <Alert className="bg-orange-50 border-orange-200">
          <WifiOff className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800">Connection Error</AlertTitle>
          <AlertDescription className="text-orange-700">
            Unable to connect to the authentication service. This may be due to:
            <ul className="list-disc ml-5 mt-2">
              <li>Network connectivity issues</li>
              <li>Temporary service unavailability</li>
            </ul>
            <Button 
              type="button"
              variant="outline" 
              size="sm"
              className="mt-2 bg-white"
              onClick={retryRegistration}
            >
              <Wifi className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {error && !networkError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
};
