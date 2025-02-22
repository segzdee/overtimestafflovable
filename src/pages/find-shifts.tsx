
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, DollarSign, Users } from "lucide-react";

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
    <div className="min-h-screen">
      <header className="flex justify-between items-center p-4 md:px-6 bg-white border-b">
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

      <div className="grid lg:grid-cols-2 gap-0 min-h-[calc(100vh-64px)]">
        {/* Left Side - Registration */}
        <div className="p-8 md:p-12 lg:p-16 bg-white">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-2">Find Extra Shifts</h1>
            <p className="text-gray-600 mb-8">Join thousands of professionals finding flexible work opportunities.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
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

        {/* Right Side - Information */}
        <div className="bg-gradient-to-br from-purple-50 to-green-50 p-8 md:p-12 lg:p-16">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <Clock className="h-6 w-6 text-purple-600 mb-2" />
                  <CardTitle>Flexible Hours</CardTitle>
                  <CardDescription>Choose shifts that fit your schedule. Work when you want, where you want.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <DollarSign className="h-6 w-6 text-purple-600 mb-2" />
                  <CardTitle>Competitive Pay</CardTitle>
                  <CardDescription>Earn competitive rates with immediate payment options available.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Calendar className="h-6 w-6 text-purple-600 mb-2" />
                  <CardTitle>Instant Booking</CardTitle>
                  <CardDescription>Book shifts instantly through our AI-powered platform.</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Why Choose OVERTIMESTAFF?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">✓ No minimum hour requirements</li>
                <li className="flex items-center gap-2">✓ Weekly payments</li>
                <li className="flex items-center gap-2">✓ Professional development opportunities</li>
                <li className="flex items-center gap-2">✓ 24/7 support team</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
