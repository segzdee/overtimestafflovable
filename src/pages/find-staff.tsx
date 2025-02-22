
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, UserCheck, Zap, Shield } from "lucide-react";

export default function FindStaff() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register', { state: { role: 'company', email, name: companyName, phone } });
  };

  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center p-4 md:px-6 bg-white border-b">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">OVERTIME<span className="text-purple-600">STAFF</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/find-shifts" className="text-gray-600 hover:text-gray-900">
            Looking for Work?
          </Link>
          <Link to="/login" className="text-purple-600 hover:text-purple-700">
            Sign in
          </Link>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-0 min-h-[calc(100vh-64px)]">
        {/* Left Side - Information */}
        <div className="bg-gradient-to-br from-purple-50 to-green-50 p-8 md:p-12 lg:p-16">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Staff Your Business Smarter</h2>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <UserCheck className="h-6 w-6 text-purple-600 mb-2" />
                  <CardTitle>Verified Professionals</CardTitle>
                  <CardDescription>Access a pool of pre-vetted, qualified staff ready to work.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-6 w-6 text-purple-600 mb-2" />
                  <CardTitle>AI-Powered Matching</CardTitle>
                  <CardDescription>Our AI ensures perfect matches for your specific needs.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-6 w-6 text-purple-600 mb-2" />
                  <CardTitle>Risk-Free Hiring</CardTitle>
                  <CardDescription>All staff are fully insured and background-checked.</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Benefits for Businesses</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">✓ No long-term commitments</li>
                <li className="flex items-center gap-2">✓ Reduced hiring costs</li>
                <li className="flex items-center gap-2">✓ Flexible staffing solutions</li>
                <li className="flex items-center gap-2">✓ Quality guaranteed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Registration */}
        <div className="p-8 md:p-12 lg:p-16 bg-white">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-2">Find Extra Staff</h1>
            <p className="text-gray-600 mb-8">Connect with qualified professionals ready to work at your business.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Business Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-green-500">
                Get Started
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
