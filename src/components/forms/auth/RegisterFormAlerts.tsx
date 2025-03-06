import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { RegisterFormAlertsProps } from "./types";

export function RegisterFormAlerts({
  error,
  networkError,
  successMessage,
  retryRegistration
}: RegisterFormAlertsProps) {
  return (
    <>
      {error && (
        <Alert className="mb-4 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {networkError && (
        <Alert className="mb-4 bg-orange-50 border-orange-200">
          <AlertCircle className="h-4 w-4 mr-2 text-orange-600" />
          <AlertDescription className="text-orange-700">
            Network error detected. Please check your internet connection.
            <Button variant="link" onClick={retryRegistration} className="ml-2 p-0 h-auto font-normal">
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 mr-2 text-green-600" />
          <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
