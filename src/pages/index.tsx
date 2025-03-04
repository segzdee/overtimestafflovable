
import React from 'react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Menu */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/find-shifts" className="text-gray-600 hover:text-purple-600 transition-colors">Find Shifts</Link>
            <Link to="/find-staff" className="text-gray-600 hover:text-purple-600 transition-colors">Find Staff</Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</Link>
            <Link to="/blog" className="text-gray-600 hover:text-purple-600 transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="hidden sm:inline-flex">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-900 hover:bg-purple-800 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Staff or Shifts on Demand</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Connect with the right people for your business or find flexible shifts that match your schedule.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register/company">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 w-full sm:w-auto">
                I Need Staff
              </Button>
            </Link>
            <Link to="/register/shift-worker">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white w-full sm:w-auto">
                I Want Shifts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Login Cards Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Login to Your Account</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-purple-100 pb-2">
                <CardTitle className="text-xl text-center text-purple-800">Shift Workers</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col items-center">
                <p className="mb-4 text-center text-gray-600">Find flexible shifts that fit your schedule</p>
                <Link to="/login?type=shift-worker" className="w-full">
                  <Button className="w-full bg-purple-700 hover:bg-purple-800">Login</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-100 pb-2">
                <CardTitle className="text-xl text-center text-blue-800">Companies</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col items-center">
                <p className="mb-4 text-center text-gray-600">Find qualified staff for your business needs</p>
                <Link to="/login?type=company" className="w-full">
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">Login</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-green-100 pb-2">
                <CardTitle className="text-xl text-center text-green-800">Agencies</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col items-center">
                <p className="mb-4 text-center text-gray-600">Manage your workforce and client relationships</p>
                <Link to="/login?type=agency" className="w-full">
                  <Button className="w-full bg-green-700 hover:bg-green-800">Login</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-amber-100 pb-2">
                <CardTitle className="text-xl text-center text-amber-800">Administrators</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col items-center">
                <p className="mb-4 text-center text-gray-600">Manage platform, users and operations</p>
                <Link to="/login?type=admin" className="w-full">
                  <Button className="w-full bg-amber-700 hover:bg-amber-800">Login</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Hospitality Market */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Live Hospitality Market</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">Current Hot Jobs</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Bartenders</span>
                    <span className="font-semibold text-green-600">+24%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Event Staff</span>
                    <span className="font-semibold text-green-600">+18%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Chefs</span>
                    <span className="font-semibold text-green-600">+15%</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">Average Hourly Rates</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Waitstaff</span>
                    <span className="font-semibold">€14.50/hr</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Bartenders</span>
                    <span className="font-semibold">€16.75/hr</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Kitchen Staff</span>
                    <span className="font-semibold">€15.25/hr</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Summer Festival</span>
                    <span className="font-semibold text-purple-600">120+ shifts</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Corporate Gala</span>
                    <span className="font-semibold text-purple-600">45+ shifts</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Holiday Season</span>
                    <span className="font-semibold text-purple-600">200+ shifts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shift Swap Marketplace */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shift Swap Marketplace</h2>
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md p-6">
            <p className="text-center text-lg mb-6">
              Need to swap a shift? Post it on our marketplace and find a replacement quickly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Restaurant Server</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Urgent</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Today, 18:00 - 23:00</p>
                <p className="text-sm text-gray-600 mb-2">Downtown Bistro</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="text-purple-700 border-purple-700">
                    Take Shift
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Bartender</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Open</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Tomorrow, 20:00 - 02:00</p>
                <p className="text-sm text-gray-600 mb-2">Nightclub Lounge</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="text-purple-700 border-purple-700">
                    Take Shift
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link to="/find-shifts">
                <Button className="bg-purple-700 hover:bg-purple-800">
                  View All Available Shifts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market Updates Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Market Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Market Update Cards */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Hospitality Demand</h3>
              <p className="text-gray-600 mb-4">
                High demand for hotel and restaurant staff this summer season.
              </p>
              <div className="text-purple-600 font-medium">25% increase</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Healthcare Shifts</h3>
              <p className="text-gray-600 mb-4">
                Nursing and care assistant positions available across the country.
              </p>
              <div className="text-purple-600 font-medium">500+ open positions</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Retail Opportunities</h3>
              <p className="text-gray-600 mb-4">
                Seasonal retail positions opening for the holiday shopping period.
              </p>
              <div className="text-purple-600 font-medium">Starting at €15/hr</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose OvertimeStaff</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">Find shifts that fit your schedule or staff when you need them most.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Payments</h3>
              <p className="text-gray-600">Get paid quickly for completed shifts with our secure payment system.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Vetted Professionals</h3>
              <p className="text-gray-600">All staff and businesses are verified for quality and reliability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Reduced Size */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <Logo className="text-white mb-3" />
              <p className="text-gray-400 text-sm">Connecting businesses with qualified staff on demand.</p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-3">For Businesses</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/find-staff" className="text-gray-400 hover:text-white">Find Staff</Link></li>
                <li><Link to="/register/company" className="text-gray-400 hover:text-white">Register as Company</Link></li>
                <li><Link to="/register/agency" className="text-gray-400 hover:text-white">Register as Agency</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-3">For Workers</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/find-shifts" className="text-gray-400 hover:text-white">Find Shifts</Link></li>
                <li><Link to="/register/shift-worker" className="text-gray-400 hover:text-white">Register as Worker</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-3">Company</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} OvertimeStaff. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
