
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const enableDevMode = () => {
    localStorage.setItem('dev-bypass', 'true');
    toast({
      title: "Developer Mode Enabled",
      description: "You now have full access to all routes.",
    });
    navigate("/dashboard/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
          {/* Login Panel */}
          <Card className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-primary">OVERTIMESTAFF</h1>
                <p className="text-muted-foreground mt-2">
                  Managing hospitality staff made simple
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <a 
                    href="/register" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/register');
                    }}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </Card>

          {/* Stats Panel */}
          <Card className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Powering Hospitality
                </h2>
                <p className="text-gray-600 mt-2">
                  Join thousands of hospitality professionals
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-gray-700">Active Staff</span>
                  <span className="text-2xl font-bold text-gray-900">1,234</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-gray-700">Open Shifts</span>
                  <span className="text-2xl font-bold text-gray-900">856</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Client Satisfaction</span>
                  <span className="text-2xl font-bold text-gray-900">98%</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  "OVERTIMESTAFF has revolutionized how we manage our temporary staff.
                  Highly recommended!"
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  - John Smith, Restaurant Manager
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer with Dev Mode Button */}
      {process.env.NODE_ENV === 'development' && (
        <footer className="py-4 px-6 border-t bg-white">
          <div className="container mx-auto flex justify-center">
            <Button
              variant="outline"
              onClick={enableDevMode}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Enable Developer Mode
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}
