
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ServerCrash, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.error("500 Error: Server error encountered");
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-orange-50">
          <ServerCrash className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Server Error</h1>
        <p className="text-gray-600">
          We're experiencing some technical difficulties. Our team has been notified and is working to fix the issue.
        </p>
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
          <Button 
            onClick={() => navigate("/")} 
            className="w-full"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
