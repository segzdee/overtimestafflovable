
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Login Panel */}
        <Card className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-brand-600">OVERTIMESTAFF</h1>
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
                <a href="#" className="text-brand-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Panel */}
        <Card className="flex-1 p-6 bg-gradient-to-br from-brand-50 to-brand-100 border-brand-200">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-brand-900">
                Powering Hospitality
              </h2>
              <p className="text-brand-600 mt-2">
                Join thousands of hospitality professionals
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-brand-200 pb-4">
                <span className="text-brand-700">Active Staff</span>
                <span className="text-2xl font-bold text-brand-900">1,234</span>
              </div>
              <div className="flex justify-between items-center border-b border-brand-200 pb-4">
                <span className="text-brand-700">Open Shifts</span>
                <span className="text-2xl font-bold text-brand-900">856</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-700">Client Satisfaction</span>
                <span className="text-2xl font-bold text-brand-900">98%</span>
              </div>
            </div>

            <div className="bg-brand-50 p-4 rounded-lg border border-brand-200">
              <p className="text-sm text-brand-700">
                "OVERTIMESTAFF has revolutionized how we manage our temporary staff.
                Highly recommended!"
              </p>
              <p className="text-sm text-brand-600 mt-2">
                - John Smith, Restaurant Manager
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
