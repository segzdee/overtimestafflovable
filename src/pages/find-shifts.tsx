
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
        <div className="bg-white p-6 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-6">
            <h1 className="text-2xl font-bold mb-2">Find Extra Shifts</h1>
            <p className="text-gray-600 mb-4">Join thousands of professionals finding flexible work opportunities.</p>
            
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

            <div className="pt-6 border-t">
              <h2 className="text-lg font-semibold mb-3">Why Healthcare Professionals Choose Us</h2>
              <div className="grid grid-cols-2 gap-3">
                <Card className="border-green-100">
                  <CardHeader className="p-4">
                    <Award className="h-6 w-6 text-green-600 mb-1" />
                    <CardTitle className="text-sm">Top Pay Rates</CardTitle>
                    <CardDescription className="text-xs">Earn up to 50% more</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-green-100">
                  <CardHeader className="p-4">
                    <BookOpen className="h-6 w-6 text-green-600 mb-1" />
                    <CardTitle className="text-sm">Development</CardTitle>
                    <CardDescription className="text-xs">Training programs</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-green-100">
                  <CardHeader className="p-4">
                    <BadgeCheck className="h-6 w-6 text-green-600 mb-1" />
                    <CardTitle className="text-sm">Verified</CardTitle>
                    <CardDescription className="text-xs">Quality locations</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-green-100">
                  <CardHeader className="p-4">
                    <Briefcase className="h-6 w-6 text-green-600 mb-1" />
                    <CardTitle className="text-sm">Growth</CardTitle>
                    <CardDescription className="text-xs">Career advancement</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-green-50 p-6 overflow-y-auto">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">How It Works</h2>
            
            <div className="grid gap-3">
              <Card>
                <CardHeader className="space-y-1 p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Flexible Hours</CardTitle>
                  </div>
                  <CardDescription>Choose shifts that fit your schedule.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="space-y-1 p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Competitive Pay</CardTitle>
                  </div>
                  <CardDescription>Earn competitive rates with immediate payment.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="space-y-1 p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">Instant Booking</CardTitle>
                  </div>
                  <CardDescription>Book shifts through our AI-powered platform.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <h3 className="font-semibold mb-2">Why Choose OVERTIMESTAFF?</h3>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li className="flex items-center gap-2">✓ No minimum hours</li>
                    <li className="flex items-center gap-2">✓ Weekly payments</li>
                    <li className="flex items-center gap-2">✓ Professional development</li>
                    <li className="flex items-center gap-2">✓ 24/7 support</li>
                  </ul>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
