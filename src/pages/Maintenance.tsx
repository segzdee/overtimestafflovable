
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wrench, Clock } from "lucide-react";

const Maintenance = () => {
  useEffect(() => {
    console.info("Maintenance page viewed");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-50">
          <Wrench className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Under Maintenance</h1>
        <p className="text-gray-600">
          We're currently performing scheduled maintenance to improve your experience. We'll be back shortly.
        </p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center justify-center gap-3">
          <Clock className="w-5 h-5 text-blue-500" />
          <p className="text-sm text-blue-700">Expected completion: <span className="font-semibold">2 hours</span></p>
        </div>
        <Button 
          onClick={() => window.location.reload()} 
          className="w-full"
        >
          Check Again
        </Button>
      </div>
    </div>
  );
};

export default Maintenance;
