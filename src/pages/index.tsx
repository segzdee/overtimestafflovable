
import React from 'react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, UserCircle, Building2, Building } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header/Menu */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-6">
            <Link to="/find-shifts" className="text-gray-600 hover:text-purple-600 transition-colors">
              Find Extra Shifts
            </Link>
            <Link to="/find-staff" className="text-gray-600 hover:text-purple-600 transition-colors">
              Find Extra Staff
            </Link>
            <Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Non Scrollable */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Meets Hospitality:</h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Extra Staff, Anytime, Anywhere</h2>
            <p className="text-md md:text-lg mb-8 max-w-3xl mx-auto">
              From unfilled shifts to finding the right staff, OVERTIMESTAFF Platform connects agencies, hotels, and businesses with AI-driven solutions.
            </p>
          </div>
        </section>

        {/* Login Cards Section */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card className="shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mt-4 mb-3">
                    <UserCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-0">Shift Worker</h3>
                  <p className="text-sm text-gray-500 mb-4">Clock-in</p>
                  <Link to="/login?type=shift-worker" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600">
                      LOGIN
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mt-4 mb-3">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-0">Agency</h3>
                  <p className="text-sm text-gray-500 mb-4">Manage Staff</p>
                  <Link to="/login?type=agency" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600">
                      LOGIN
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mt-4 mb-3">
                    <Building className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-0">Company</h3>
                  <p className="text-sm text-gray-500 mb-4">Post Shifts</p>
                  <Link to="/login?type=company" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600">
                      LOGIN
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mt-4 mb-3">
                    <Bot className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-0">AI Agents</h3>
                  <p className="text-sm text-gray-500 mb-4">Token Auth</p>
                  <Link to="/login?type=ai-agent" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600">
                      LOGIN
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Live Market Updates */}
        <section className="py-4 flex-grow flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="bg-gray-900 rounded-lg shadow-md p-4 max-w-5xl mx-auto text-white">
              <div className="flex justify-between items-center mb-3 px-2">
                <h2 className="text-sm font-semibold text-gray-400">LIVE MARKET UPDATES</h2>
                <span className="text-sm text-gray-400">7:45:51 AM</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="bg-purple-900 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-purple-300">URGENT</span>
                    <span className="text-lg font-semibold text-green-400">$35/hr</span>
                  </div>
                  <h3 className="font-semibold mb-1">Kitchen Staff Needed</h3>
                  <p className="text-xs text-gray-400">Downtown</p>
                </div>
                
                <div className="bg-gray-800 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-green-400">NEW</span>
                    <span className="text-lg font-semibold text-green-400">$25/hr</span>
                  </div>
                  <h3 className="font-semibold mb-1">Server Position</h3>
                  <p className="text-xs text-gray-400">Midtown</p>
                </div>
                
                <div className="bg-gray-800 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-amber-400">SWAP</span>
                    <span className="text-lg font-semibold text-green-400">$30/hr</span>
                  </div>
                  <h3 className="font-semibold mb-1">Bartender Shift</h3>
                  <p className="text-xs text-gray-400">Upper East</p>
                </div>
                
                <div className="bg-purple-900 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-purple-300">PREMIUM</span>
                    <span className="text-lg font-semibold text-green-400">$40/hr</span>
                  </div>
                  <h3 className="font-semibold mb-1">Night Manager</h3>
                  <p className="text-xs text-gray-400">Financial District</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3 px-2">
                <p className="text-xs text-gray-400">Updated every 5 minutes</p>
                <p className="text-xs text-gray-400">0 new positions added today</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Minimalist Footer */}
      <footer className="py-2 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6 text-sm">
            <Link to="/terms" className="text-gray-600 hover:text-purple-600">Terms</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-purple-600">Privacy</Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600">Contact</Link>
            <Link to="/blog" className="text-gray-600 hover:text-purple-600">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
