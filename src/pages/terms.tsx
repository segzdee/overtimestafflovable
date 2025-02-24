
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using Overtimestaff, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
            <p className="text-gray-600">
              Users must provide accurate information during registration and maintain the security of their account credentials. Any activities that occur under your account are your responsibility.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Service Description</h2>
            <p className="text-gray-600">
              Overtimestaff is a platform connecting hospitality professionals with temporary work opportunities. We facilitate connections but are not party to any employment agreements between users.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Payment Terms</h2>
            <p className="text-gray-600">
              All payments are processed through our secure payment system. Service fees are non-refundable unless otherwise specified. Users agree to pay all applicable fees and taxes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
            <p className="text-gray-600">
              All content and materials available on Overtimestaff are property of the platform or its licensors and are protected by intellectual property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
            <p className="text-gray-600">
              Overtimestaff is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.
            </p>
          </section>

          <p className="text-sm text-gray-500 pt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
