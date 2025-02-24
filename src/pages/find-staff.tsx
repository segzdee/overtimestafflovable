import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, UserCheck, Zap, Shield, ChartBar, Clock, Target, Users } from "lucide-react";

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
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-4 h-14 bg-white border-b">
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

      <div className="flex-1 grid lg:grid-cols-2">
        <div className="bg-gradient-to-br from-purple-50 to-green-50 p-6 overflow-y-auto">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Staff Your Business Smarter</h2>
            
            <div className="grid gap-4">
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Verified Professionals</CardTitle>
                  </div>
                  <CardDescription>Access a pool of pre-vetted, qualified staff ready to work.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">AI-Powered Matching</CardTitle>
                  </div>
                  <CardDescription>Our AI ensures perfect matches for your specific needs.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Risk-Free Hiring</CardTitle>
                  </div>
                  <CardDescription>All staff are fully insured and background-checked.</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader>
                <h3 className="font-semibold">Benefits for Businesses</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li className="flex items-center gap-2">✓ No long-term commitments</li>
                  <li className="flex items-center gap-2">✓ Reduced hiring costs</li>
                  <li className="flex items-center gap-2">✓ Flexible staffing solutions</li>
                  <li className="flex items-center gap-2">✓ Quality guaranteed</li>
                </ul>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="bg-white p-6 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-8">
            <h1 className="text-2xl font-bold mb-2">Find Extra Staff</h1>
            <p className="text-gray-600 mb-6">Connect with qualified professionals ready to work at your business.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div>
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
              <div>
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

            <div className="pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">Why Healthcare Facilities Trust Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-purple-100">
                  <CardHeader>
                    <ChartBar className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-base">Cost Efficiency</CardTitle>
                    <CardDescription>Reduce overtime costs and agency fees</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-purple-100">
                  <CardHeader>
                    <Clock className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-base">Quick Response</CardTitle>
                    <CardDescription>Fill shifts in as little as 4 hours</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-purple-100">
                  <CardHeader>
                    <Target className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-base">Quality Matching</CardTitle>
                    <CardDescription>AI-powered staff matching system</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-purple-100">
                  <CardHeader>
                    <Users className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-base">Reliable Staff</CardTitle>
                    <CardDescription>Verified and experienced professionals</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
