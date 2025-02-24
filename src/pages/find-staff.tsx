
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Shield, Zap, UserCheck, Clock } from "lucide-react";

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
      <header className="flex justify-between items-center px-6 h-16 bg-white border-b">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">OVERTIME<span className="text-purple-600">STAFF</span></span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/find-shifts" className="text-gray-600 hover:text-gray-900">
            Looking for Work?
          </Link>
          <Link to="/login" className="text-purple-600 hover:text-purple-700">
            Sign in
          </Link>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        <div className="bg-white p-6 md:p-8 lg:p-12">
          <div className="max-w-xl mx-auto space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Staff Your Business Smarter</h1>
              <p className="text-gray-600">Connect with qualified professionals instantly.</p>
            </div>

            <div className="grid gap-6">
              <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">Verified Professionals</h3>
                </div>
                <p className="text-gray-600 text-sm">Access pre-vetted, qualified staff.</p>
              </div>

              <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">AI-Powered Matching</h3>
                </div>
                <p className="text-gray-600 text-sm">Perfect matches for your needs.</p>
              </div>

              <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">Risk-Free Hiring</h3>
                </div>
                <p className="text-gray-600 text-sm">All staff are insured and verified.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">4.9/5</div>
                <div className="text-sm text-gray-600">Client Rating</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">2hr</div>
                <div className="text-sm text-gray-600">Avg. Fill Time</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">10k+</div>
                <div className="text-sm text-gray-600">Staff Available</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 md:p-8 lg:p-12">
          <div className="max-w-md mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get Started</h2>
              <p className="text-gray-600">Fill in your details to access our staffing platform.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="h-12"
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
                  className="h-12"
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
                  className="h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            </form>

            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold">The Grand Hotel</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">"Perfect staff matched to our needs. The AI matching system really works!"</p>
              </div>

              <div className="p-6 bg-white rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold">Sunset Restaurant</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">"Reliable staff, always on time. Makes scheduling so much easier."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
