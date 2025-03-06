
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
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
            <ShieldCheck className="h-6 w-6 text-purple-600" />
            <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last updated: {lastUpdated.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>10 minute read</span>
            </div>
          </div>
          
          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">1. Data Collection</h2>
            <p className="text-gray-600">
              We collect information that you provide directly to us, including but not limited to your name, email address, phone number, and professional qualifications. We also collect data about your usage of our platform.
            </p>
            <p className="text-gray-600">
              Information we collect includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Account information (name, email, phone number)</li>
              <li>Profile information (experience, qualifications, preferences)</li>
              <li>Employment history and professional credentials</li>
              <li>Payment information (stored securely with our payment processor)</li>
              <li>Communication data (messages, reviews, feedback)</li>
              <li>Usage data (interactions with our platform)</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <p className="text-gray-600">We use your information for various purposes, including:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>To provide and maintain our service</li>
              <li>To match workers with appropriate shifts</li>
              <li>To process payments and payouts</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">3. Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational security measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
            </p>
            <p className="text-gray-600">
              Our security practices include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure data handling procedures</li>
              <li>Regular security training for our team</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">4. Your Rights</h2>
            <p className="text-gray-600">
              You have the right to access, correct, or delete your personal data. You can also object to processing and request data portability. Contact us to exercise these rights.
            </p>
            <p className="text-gray-600">
              Specifically, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request erasure of your data</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <p className="text-gray-600">
              Types of cookies we use:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Essential cookies: Required for basic functionality</li>
              <li>Functional cookies: Remember your preferences</li>
              <li>Analytics cookies: Help us understand how you use our service</li>
              <li>Marketing cookies: Track your activities across websites</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">6. Data Sharing and Third Parties</h2>
            <p className="text-gray-600">
              We may share your information with third parties in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>With employers or workers as necessary to facilitate job matching</li>
              <li>With service providers who perform services on our behalf</li>
              <li>For legal compliance and to protect rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your consent or at your direction</li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">7. International Data Transfers</h2>
            <p className="text-gray-600">
              Your information may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ.
            </p>
            <p className="text-gray-600">
              We ensure appropriate safeguards are in place to protect your data when transferred internationally.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-600">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p className="text-gray-600">
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">9. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at privacy@overtimestaff.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
