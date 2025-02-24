import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Calendar, DollarSign, Users, Award, BookOpen, BadgeCheck, Briefcase } from "lucide-react";

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
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-4 h-14 bg-white border-b">
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

      <div className="flex-1 grid lg:grid-cols-2">
        <div className="bg-white p-6 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-8">
            <h1 className="text-2xl font-bold mb-2">Find Extra Shifts</h1>
            <p className="text-gray-600 mb-6">Join thousands of professionals finding flexible work opportunities.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-green-500">
                Get Started
              </Button>
            </form>

            <div className="pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">Why Healthcare Professionals Choose Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-green-100">
                  <CardHeader>
                    <Award className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle className="text-base">Top Pay Rates</CardTitle>
                    <CardDescription>Earn up to 50% more than standard rates</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-green-100">
                  <CardHeader>
                    <BookOpen className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle className="text-base">Professional Development</CardTitle>
                    <CardDescription>Access to training and certification programs</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-green-100">
                  <CardHeader>
                    <BadgeCheck className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle className="text-base">Verified Facilities</CardTitle>
                    <CardDescription>Work at pre-screened, quality locations</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-green-100">
                  <CardHeader>
                    <Briefcase className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle className="text-base">Career Growth</CardTitle>
                    <CardDescription>Diverse opportunities to advance your career</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-green-50 p-6 overflow-y-auto">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">How It Works</h2>
            
            <div className="grid gap-4">
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Flexible Hours</CardTitle>
                  </div>
                  <CardDescription>Choose shifts that fit your schedule. Work when you want, where you want.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Competitive Pay</CardTitle>
                  </div>
                  <CardDescription>Earn competitive rates with immediate payment options available.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Instant Booking</CardTitle>
                  </div>
                  <CardDescription>Book shifts instantly through our AI-powered platform.</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader>
                <h3 className="font-semibold">Why Choose OVERTIMESTAFF?</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li className="flex items-center gap-2">✓ No minimum hour requirements</li>
                  <li className="flex items-center gap-2">✓ Weekly payments</li>
                  <li className="flex items-center gap-2">✓ Professional development opportunities</li>
                  <li className="flex items-center gap-2">✓ 24/7 support team</li>
                </ul>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
