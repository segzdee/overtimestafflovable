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
    navigate('/register', {
      state: {
        role: 'shift-worker',
        email,
        name,
        phone
      }
    });
  };
  return <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-4 sm:px-6 h-14 sm:h-16 bg-white border-b">
        <Link to="/" className="flex items-center">
          <span className="text-lg sm:text-xl font-bold whitespace-nowrap">OVERTIME<span className="text-purple-600">STAFF</span></span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/find-staff" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
            Looking to Hire?
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
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Find Extra Shifts in Top Venues</h1>
              <p className="text-gray-600 text-sm sm:text-base">Access premium shifts at leading hotels, restaurants, and events.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2 bg-slate-50">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} required className="h-10 sm:h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required className="h-10 sm:h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)} required className="h-10 sm:h-12" />
              </div>
              <Button type="submit" className="w-full h-10 sm:h-12 text-base sm:text-lg bg-purple-600 hover:bg-purple-700 text-slate-50">
                Start Earning Today
              </Button>
            </form>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <span className="text-sm sm:text-base">Premium Rates</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <span className="text-sm sm:text-base">Flexible Hours</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <span className="text-sm sm:text-base">Weekly Pay</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <span className="text-sm sm:text-base">Top Venues</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">500+</div>
                <div className="text-xs sm:text-sm text-gray-600">Partner Venues</div>
              </div>
              <div className="bg-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">10K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Active Staff</div>
              </div>
              <div className="bg-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">95%</div>
                <div className="text-xs sm:text-sm text-gray-600">Fill Rate</div>
              </div>
              <div className="bg-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">$2M+</div>
                <div className="text-xs sm:text-sm text-gray-600">Weekly Payouts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-md mx-auto space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">How It Works</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-sm sm:text-base">1. Create Your Profile</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Sign up and get approved within 24 hours.</p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-sm sm:text-base">2. Browse Opportunities</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Find shifts that match your preferences.</p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-sm sm:text-base">3. Book Instantly</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Get instant confirmations for your shifts.</p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-sm sm:text-base">4. Earn & Grow</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Get paid weekly and build your reputation.</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-600 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-slate-50">Available Positions</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span>Event Server</span>
                  <span className="font-semibold">$25-30/hr</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span>Bartender</span>
                  <span className="font-semibold">$30-35/hr</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span>Hotel Staff</span>
                  <span className="font-semibold">$22-28/hr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}