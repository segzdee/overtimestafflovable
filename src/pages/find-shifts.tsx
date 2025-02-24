
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Clock, DollarSign, Building2, User, Trophy, Calendar, BadgeCheck } from "lucide-react";

export default function FindShifts() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register', { state: { role: 'shift-worker', email, name, phone } });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="flex justify-between items-center px-4 h-14 bg-white border-b shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">OVERTIME<span className="text-purple-600">STAFF</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/find-staff" className="text-gray-600 hover:text-gray-900">
            Looking to Hire?
          </Link>
          <Link to="/login" className="text-purple-600 hover:text-purple-700">
            Sign in
          </Link>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-2 overflow-hidden">
        <div className="p-8 bg-white overflow-y-auto">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold mb-3">Find Extra Shifts in Top Venues</h1>
            <p className="text-gray-600 mb-6">Join thousands of hospitality professionals accessing premium shifts at leading hotels, restaurants, and events.</p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
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
                Start Earning Today
              </Button>
            </form>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                <span className="text-sm">Premium Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-sm">Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <span className="text-sm">Weekly Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                <span className="text-sm">Top Venues</span>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg mb-8">
              <h2 className="font-semibold mb-4">Platform Statistics</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-purple-600">500+</div>
                  <div className="text-sm text-gray-600">Partner Venues</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">10K+</div>
                  <div className="text-sm text-gray-600">Active Staff</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Shift Fill Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">$2M+</div>
                  <div className="text-sm text-gray-600">Weekly Payouts</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="italic text-gray-600 mb-4">
                "OVERTIMESTAFF has transformed how I work in hospitality. I can pick up shifts that fit my schedule and earn more than ever before."
              </div>
              <div className="flex items-center gap-3">
                <User className="w-10 h-10 text-gray-400" />
                <div>
                  <div className="font-semibold">Sarah M.</div>
                  <div className="text-sm text-gray-600">Event Staff Professional</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold">1. Create Your Profile</h3>
                  </div>
                  <p className="text-sm text-gray-600">Sign up, add your experience, and complete verification. Get approved within 24 hours.</p>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold">2. Browse Opportunities</h3>
                  </div>
                  <p className="text-sm text-gray-600">Access shifts at top venues. Filter by location, role, and pay rate.</p>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold">3. Book Instantly</h3>
                  </div>
                  <p className="text-sm text-gray-600">Select your preferred shifts and get instant confirmations. No phone calls needed.</p>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold">4. Earn & Grow</h3>
                  </div>
                  <p className="text-sm text-gray-600">Get paid weekly. Build your reputation and unlock premium opportunities.</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-600 text-white p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Platform Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">Quality Venues</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Same Week Pay</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">Rating System</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Trending Opportunities</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span>Event Server</span>
                  <span className="text-purple-600 font-semibold">$25-30/hr</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span>Bartender</span>
                  <span className="text-purple-600 font-semibold">$30-35/hr</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span>Hotel Staff</span>
                  <span className="text-purple-600 font-semibold">$22-28/hr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
