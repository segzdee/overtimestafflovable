
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
      <header className="flex justify-between items-center px-4 sm:px-6 h-14 sm:h-16 bg-white border-b">
        <Link to="/" className="flex items-center">
          <span className="text-lg sm:text-xl font-bold whitespace-nowrap">OVERTIME<span className="text-purple-600">STAFF</span></span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/find-shifts" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
            Looking for Work?
          </Link>
          <Link to="/login" className="text-purple-600 hover:text-purple-700 text-sm sm:text-base">
            Sign in
          </Link>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-2 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden">
        <div className="bg-white overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-xl mx-auto space-y-6 sm:space-y-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Staff Your Business Smarter</h1>
              <p className="text-gray-600 text-sm sm:text-base">Connect with qualified professionals instantly.</p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 border rounded-lg sm:rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  <h3 className="font-semibold text-sm sm:text-base">Verified Professionals</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Access pre-vetted, qualified staff.</p>
              </div>

              <div className="p-4 sm:p-6 border rounded-lg sm:rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  <h3 className="font-semibold text-sm sm:text-base">AI-Powered Matching</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Perfect matches for your needs.</p>
              </div>

              <div className="p-4 sm:p-6 border rounded-lg sm:rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  <h3 className="font-semibold text-sm sm:text-base">Risk-Free Hiring</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">All staff are insured and verified.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">98%</div>
                <div className="text-xs sm:text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="bg-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">4.9/5</div>
                <div className="text-xs sm:text-sm text-gray-600">Client Rating</div>
              </div>
              <div className="bg-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">2hr</div>
                <div className="text-xs sm:text-sm text-gray-600">Avg. Fill Time</div>
              </div>
              <div className="bg-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">10k+</div>
                <div className="text-xs sm:text-sm text-gray-600">Staff Available</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-md mx-auto space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Get Started</h2>
              <p className="text-gray-600 text-sm sm:text-base">Fill in your details to access our staffing platform.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="h-10 sm:h-12"
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
                  className="h-10 sm:h-12"
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
                  className="h-10 sm:h-12"
                />
              </div>
              <Button type="submit" className="w-full h-10 sm:h-12 text-base sm:text-lg bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            </form>

            <div className="space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-sm sm:text-base">The Grand Hotel</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">"Perfect staff matched to our needs. The AI matching system really works!"</p>
              </div>

              <div className="p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-sm sm:text-base">Sunset Restaurant</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">"Reliable staff, always on time. Makes scheduling so much easier."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
