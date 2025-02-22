
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
              <div>
                <Input type="email" placeholder="Email" />
              </div>
              <div>
                <Input type="password" placeholder="Password" />
              </div>
              <Button className="w-full" size="lg">
                Login
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline">
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
  );
}
