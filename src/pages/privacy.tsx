
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
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
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Data Collection</h2>
            <p className="text-gray-600">
              We collect information that you provide directly to us, including but not limited to your name, email address, phone number, and professional qualifications. We also collect data about your usage of our platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational security measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p className="text-gray-600">
              You have the right to access, correct, or delete your personal data. You can also object to processing and request data portability. Contact us to exercise these rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Cookies</h2>
            <p className="text-gray-600">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
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
