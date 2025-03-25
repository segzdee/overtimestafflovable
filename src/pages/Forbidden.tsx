
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.error("403 Error: User attempted to access forbidden resource");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-50">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline" 
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
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

export default Forbidden;
