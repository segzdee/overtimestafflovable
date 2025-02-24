
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
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="flex justify-between items-center px-4 h-14 bg-white border-b shrink-0">
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

      <div className="flex-1 grid lg:grid-cols-2 overflow-hidden">
        <div className="bg-gradient-to-br from-purple-50 to-green-50 p-6 overflow-y-auto">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Staff Your Business Smarter</h2>
            
            <div className="grid gap-3">
              <Card>
                <CardHeader className="space-y-1 p-4">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Verified Professionals</CardTitle>
                  </div>
                  <CardDescription>Access pre-vetted, qualified staff.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="space-y-1 p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">AI-Powered Matching</CardTitle>
                  </div>
                  <CardDescription>Perfect matches for your needs.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="space-y-1 p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Risk-Free Hiring</CardTitle>
                  </div>
                  <CardDescription>All staff are insured and verified.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <h3 className="font-semibold mb-2">Benefits for Businesses</h3>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li className="flex items-center gap-2">✓ No commitments</li>
                    <li className="flex items-center gap-2">✓ Reduced costs</li>
                    <li className="flex items-center gap-2">✓ Flexible staffing</li>
                    <li className="flex items-center gap-2">✓ Quality assured</li>
                  </ul>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-6">
            <h1 className="text-2xl font-bold mb-2">Find Extra Staff</h1>
            <p className="text-gray-600 mb-4">Connect with qualified professionals ready to work.</p>
            
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

            <div className="pt-6 border-t">
              <h2 className="text-lg font-semibold mb-3">Why Healthcare Facilities Trust Us</h2>
              <div className="grid grid-cols-2 gap-3">
                <Card className="border-purple-100">
                  <CardHeader className="p-4">
                    <ChartBar className="h-6 w-6 text-purple-600 mb-1" />
                    <CardTitle className="text-sm">Cost Efficient</CardTitle>
                    <CardDescription className="text-xs">Reduce costs</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-purple-100">
                  <CardHeader className="p-4">
                    <Clock className="h-6 w-6 text-purple-600 mb-1" />
                    <CardTitle className="text-sm">Quick Fill</CardTitle>
                    <CardDescription className="text-xs">4-hour response</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-purple-100">
                  <CardHeader className="p-4">
                    <Target className="h-6 w-6 text-purple-600 mb-1" />
                    <CardTitle className="text-sm">AI Matching</CardTitle>
                    <CardDescription className="text-xs">Smart system</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-purple-100">
                  <CardHeader className="p-4">
                    <Users className="h-6 w-6 text-purple-600 mb-1" />
                    <CardTitle className="text-sm">Reliable</CardTitle>
                    <CardDescription className="text-xs">Verified staff</CardDescription>
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
