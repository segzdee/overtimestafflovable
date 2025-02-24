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
        <div className="bg-white h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Staff Your Business Smarter</h1>

            <div className="space-y-4 mb-8">
              <div className="p-6 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">Verified Professionals</h3>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Access pre-vetted, qualified staff.</p>
              </div>

              <div className="p-6 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">AI-Powered Matching</h3>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Perfect matches for your needs.</p>
              </div>

              <div className="p-6 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">Risk-Free Hiring</h3>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">All staff are insured and verified.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">How It Works</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h3 className="font-semibold">Create Your Business Profile</h3>
                    <p className="text-sm text-gray-600">Quick setup with business verification</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h3 className="font-semibold">Post Your Requirements</h3>
                    <p className="text-sm text-gray-600">Specify skills, timing, and preferences</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h3 className="font-semibold">Get Matched</h3>
                    <p className="text-sm text-gray-600">AI matches you with perfect candidates</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h3 className="font-semibold">Start Working</h3>
                    <p className="text-sm text-gray-600">Staff arrive ready to contribute</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">4.9/5</div>
                <div className="text-sm text-gray-600">Client Rating</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">2hr</div>
                <div className="text-sm text-gray-600">Avg. Fill Time</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">10k+</div>
                <div className="text-sm text-gray-600">Staff Available</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Find Extra Staff</h2>
            <p className="text-gray-600 mb-6">Connect with qualified professionals ready to work.</p>
            
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
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            </form>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold">The Grand Hotel</div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">"Perfect staff matched to our needs. The AI matching system really works!"</p>
                  <p className="text-xs text-gray-500 mt-2">2 days ago</p>
                </div>

                <div className="p-4 bg-white rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold">Sunset Restaurant</div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">"Reliable staff, always on time. Makes scheduling so much easier."</p>
                  <p className="text-xs text-gray-500 mt-2">1 week ago</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex flex-col items-center">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">Verified Business</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">Top Rated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
