
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";

export default function Terms() {
  const navigate = useNavigate();
  const lastUpdated = new Date("2024-05-15");
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
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
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-6 w-6 text-purple-600" />
            <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last updated: {lastUpdated.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>15 minute read</span>
            </div>
          </div>
          
          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using Overtimestaff, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
            <p className="text-gray-600">
              Users must provide accurate information during registration and maintain the security of their account credentials. Any activities that occur under your account are your responsibility.
            </p>
            <p className="text-gray-600">
              Users agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Provide false or misleading information</li>
              <li>Attempt to circumvent any security measures</li>
              <li>Use the service for any unlawful purpose</li>
              <li>Interfere with the proper operation of the platform</li>
              <li>Share account credentials with third parties</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">3. Service Description</h2>
            <p className="text-gray-600">
              Overtimestaff is a platform connecting hospitality professionals with temporary work opportunities. We facilitate connections but are not party to any employment agreements between users.
            </p>
            <p className="text-gray-600">
              Our role is limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Providing the platform for users to connect</li>
              <li>Facilitating communication between parties</li>
              <li>Processing payments through our secure system</li>
              <li>Offering dispute resolution mechanisms</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">4. Payment Terms</h2>
            <p className="text-gray-600">
              All payments are processed through our secure payment system. Service fees are non-refundable unless otherwise specified. Users agree to pay all applicable fees and taxes.
            </p>
            <p className="text-gray-600">
              Payment specifics:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Payments are held in escrow until services are completed</li>
              <li>Our platform fee is 5% of the total transaction</li>
              <li>Payouts are processed within 3 business days</li>
              <li>Disputes must be filed within 5 days of service completion</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
            <p className="text-gray-600">
              All content and materials available on Overtimestaff are property of the platform or its licensors and are protected by intellectual property laws.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
            <p className="text-gray-600">
              Overtimestaff is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">7. Termination</h2>
            <p className="text-gray-600">
              We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">8. Governing Law</h2>
            <p className="text-gray-600">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Overtimestaff operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">9. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of these terms and by maintaining a current version of the terms at overtimestaff.com/terms.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">10. Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms, please contact us at legal@overtimestaff.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
