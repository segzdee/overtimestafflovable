
import React from 'react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo className="text-white mb-4" />
              <p className="text-gray-400">Connecting businesses with qualified staff on demand.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Businesses</h4>
              <ul className="space-y-2">
                <li><Link to="/find-staff" className="text-gray-400 hover:text-white">Find Staff</Link></li>
                <li><Link to="/register/company" className="text-gray-400 hover:text-white">Register as Company</Link></li>
                <li><Link to="/register/agency" className="text-gray-400 hover:text-white">Register as Agency</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2">
                <li><Link to="/find-shifts" className="text-gray-400 hover:text-white">Find Shifts</Link></li>
                <li><Link to="/register/shift-worker" className="text-gray-400 hover:text-white">Register as Worker</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} OvertimeStaff. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
