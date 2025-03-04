
import React from 'react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, UserCircle, Building2, Building } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] overflow-hidden">
      {/* Header/Menu - More compact */}
      <header className="bg-white shadow-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/find-shifts" className="text-sm md:text-base text-gray-600 hover:text-purple-600 transition-colors">
              Find Extra Shifts
            </Link>
            <Link to="/find-staff" className="text-sm md:text-base text-gray-600 hover:text-purple-600 transition-colors">
              Find Extra Staff
            </Link>
            <Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700 text-white text-sm md:text-base py-1 px-3 md:py-2 md:px-4">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Fixed height with flex-grow, no scrolling */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Hero Section - More compact */}
        <section className="py-4 md:py-6">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 md:mb-2">AI Meets Hospitality</h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3">Extra Staff, Anytime, Anywhere</h2>
            <p className="text-sm md:text-md lg:text-lg mb-4 max-w-3xl mx-auto text-gray-600">
              Got extra time? Need extra shifts? No dinner staff coverage? Plan canceled? The OVERTIMESTAFF 
              Platform connects people with spare time to hospitality companies and agencies using smart AI 
              integration.
            </p>
          </div>
        </section>

        {/* Login Cards Section - Improved grid layout and consistent sizing */}
        <section className="py-2">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto">
              {/* Staffing Agency Card */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                <CardContent className="p-2 md:p-4 flex flex-col items-center justify-between h-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mt-2 md:mt-4 mb-2 md:mb-3">
                    <Building2 className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm md:text-lg font-semibold mb-0">Staffing Agency</h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-4">Manage Multiple Venues and Staff</p>
                  </div>
                  <Link to="/login?type=agency" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 text-xs md:text-sm py-1 md:py-2">
                      LOGIN
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Hotels & Businesses Card */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                <CardContent className="p-2 md:p-4 flex flex-col items-center justify-between h-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mt-2 md:mt-4 mb-2 md:mb-3">
                    <Building className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm md:text-lg font-semibold mb-0">Hotels & Businesses</h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-4">Post shifts and hire Extra Staff</p>
                  </div>
                  <Link to="/login?type=company" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 text-xs md:text-sm py-1 md:py-2">
                      LOGIN
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Shift Workers Card */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                <CardContent className="p-2 md:p-4 flex flex-col items-center justify-between h-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mt-2 md:mt-4 mb-2 md:mb-3">
                    <UserCircle className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm md:text-lg font-semibold mb-0">Shift Workers</h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-4">Clock-In for Extra Shifts</p>
                  </div>
                  <Link to="/login?type=shift-worker" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 text-xs md:text-sm py-1 md:py-2">
                      LOGIN
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* AI Agent Card */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                <CardContent className="p-2 md:p-4 flex flex-col items-center justify-between h-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-full flex items-center justify-center mt-2 md:mt-4 mb-2 md:mb-3">
                    <Bot className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm md:text-lg font-semibold mb-0">AI Agent</h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-4">Activate Agent for Automation</p>
                  </div>
                  <Link to="/login?type=ai-agent" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 text-xs md:text-sm py-1 md:py-2">
                      LOGIN
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Live Market Updates - With symmetrical layout and optimized spacing */}
        <section className="py-2 flex-grow flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="bg-gray-900 rounded-lg shadow-md p-2 md:p-4 max-w-5xl mx-auto text-white">
              <div className="flex justify-between items-center mb-2 md:mb-3 px-2">
                <div className="flex space-x-2 items-center">
                  <h2 className="text-xs font-semibold text-green-400">LIVE HOSPITALITY INDEX</h2>
                  <div className="flex items-center">
                    <span className="px-1 py-0.5 text-[10px] md:text-xs bg-gray-800 rounded text-white mx-1">FIL</span>
                    <span className="px-1 py-0.5 text-[10px] md:text-xs bg-gray-800 rounded text-white">LON</span>
                  </div>
                </div>
                <span className="text-[10px] md:text-xs text-gray-400">9:49:30 PM UTC</span>
              </div>
              
              {/* Market updates grid - Responsive and symmetrical */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div className="space-y-2 md:space-y-3">
                  {/* Regular shifts - Column 1 */}
                  <div className="bg-gray-800 p-2 md:p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] md:text-xs bg-amber-500 px-1 py-0.5 rounded text-black font-medium">SWAP</span>
                      <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                      <span className="text-xs md:text-sm font-semibold text-green-400">€30/hr</span>
                    </div>
                    <h3 className="font-semibold text-xs md:text-sm">Bartender Evening Shift Available</h3>
                    <p className="text-[10px] md:text-xs text-gray-400">Sky Bar Lounge</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Södermalm, Global</p>
                  </div>
                  
                  <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                      <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                      <span className="text-xs md:text-sm font-semibold text-green-400">€38/hr</span>
                    </div>
                    <h3 className="font-semibold text-xs md:text-sm">F&B Manager - 5-Star Resort</h3>
                    <p className="text-[10px] md:text-xs text-gray-400">Azure Beach Resort</p>
                    <p className="text-[10px] md:text-xs text-gray-500">St. Julian's, Malta</p>
                  </div>
                  
                  <div className="bg-gray-800 p-2 md:p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] md:text-xs bg-amber-500 px-1 py-0.5 rounded text-black font-medium">SWAP</span>
                      <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                      <span className="text-xs md:text-sm font-semibold text-green-400">€32/hr</span>
                    </div>
                    <h3 className="font-semibold text-xs md:text-sm">Head Bartender - Cocktail Bar</h3>
                    <p className="text-[10px] md:text-xs text-gray-400">The Mixology Lab</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Sliema, Malta</p>
                  </div>
                  
                  <div className="bg-gray-800 p-2 md:p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] md:text-xs bg-amber-500 px-1 py-0.5 rounded text-black font-medium">SWAP</span>
                      <span className="text-[10px] md:text-xs bg-green-500/20 px-1 py-0.5 rounded text-green-400 font-medium">LOW</span>
                      <span className="text-xs md:text-sm font-semibold text-green-400">€28/hr</span>
                    </div>
                    <h3 className="font-semibold text-xs md:text-sm">Head Waiter - Luxury Restaurant</h3>
                    <p className="text-[10px] md:text-xs text-gray-400">Signature Soirée</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Sliema, Italy</p>
                  </div>
                </div>
                
                {/* Premium shifts - Column 2 */}
                <div className="space-y-2 md:space-y-3">
                  <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                      <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                      <span className="text-xs md:text-sm font-semibold text-green-400">€38/hr</span>
                    </div>
                    <h3 className="font-semibold text-xs md:text-sm">F&B Manager - 5-Star Resort</h3>
                    <p className="text-[10px] md:text-xs text-gray-400">Azure Beach Resort</p>
                    <p className="text-[10px] md:text-xs text-gray-500">St. Julian's, Malta</p>
                  </div>
                  
                  <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                      <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                      <span className="text-xs md:text-sm font-semibold text-green-400">€38/hr</span>
                    </div>
                    <h3 className="font-semibold text-xs md:text-sm">F&B Manager - 5-Star Resort</h3>
                    <p className="text-[10px] md:text-xs text-gray-400">Azure Beach Resort</p>
                    <p className="text-[10px] md:text-xs text-gray-500">St. Julian's, Malta</p>
                  </div>
                  
                  <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                      <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                      <span className="text-xs md:text-sm font-semibold text-green-400">€39/hr</span>
                    </div>
                    <h3 className="font-semibold text-xs md:text-sm">Pastry Chef - 5-Star Hotel</h3>
                    <p className="text-[10px] md:text-xs text-gray-400">Le Grand Patisserie</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Port Louis, Italy</p>
                  </div>
                  
                  <div className="bg-purple-900/70 p-2 md:p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] md:text-xs bg-purple-500 px-1 py-0.5 rounded text-white font-medium">PREMIUM</span>
                      <span className="text-[10px] md:text-xs bg-amber-500/20 px-1 py-0.5 rounded text-amber-400 font-medium">MEDIUM</span>
                      <span className="text-xs md:text-sm font-semibold text-green-400">€50/hr</span>
                    </div>
                    <h3 className="font-semibold text-xs md:text-sm">Executive Pastry Chef</h3>
                    <p className="text-[10px] md:text-xs text-gray-400">Royal Dining Group</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Milan, Italy</p>
                  </div>
                </div>
              </div>
              
              {/* Emergency & Shift Swap Index - Optimized for all screens */}
              <div className="mt-2 md:mt-3">
                <div className="flex justify-between items-center px-2 mb-1 md:mb-2">
                  <div className="flex space-x-2 items-center">
                    <h2 className="text-[10px] md:text-xs font-semibold text-green-400">EMERGENCY & SHIFT SWAP INDEX</h2>
                    <div className="px-1 py-0.5 bg-red-500/20 rounded text-red-400 text-[10px] md:text-xs font-medium">
                      2 Active
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-1 py-0.5 text-[10px] md:text-xs bg-gray-800 rounded text-white">LON</span>
                    <span className="text-[10px] md:text-xs text-gray-400">9:49:30 PM UTC</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 md:p-3">
                  <div className="space-y-2 md:space-y-3">
                    {/* Emergency Shift 1 */}
                    <div className="border-b border-gray-700 pb-2 md:pb-3">
                      <div className="flex items-center mb-1">
                        <span className="text-[10px] md:text-xs bg-red-500 px-1 py-0.5 rounded text-white font-medium mr-2">URGENT</span>
                        <span className="text-xs md:text-sm font-semibold text-green-400 ml-auto">€40/hr</span>
                      </div>
                      <h3 className="font-semibold text-xs md:text-sm">Sous Chef - Michelin Restaurant</h3>
                      <p className="text-[10px] md:text-xs text-gray-400">Casa del Mar</p>
                      <p className="text-[10px] md:text-xs text-gray-500">Barcelona, Spain</p>
                    </div>
                    
                    {/* Emergency Shift 2 */}
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="text-[10px] md:text-xs bg-amber-500 px-1 py-0.5 rounded text-black font-medium mr-2">SWAP</span>
                        <span className="text-xs md:text-sm font-semibold text-green-400 ml-auto">€35/hr</span>
                      </div>
                      <h3 className="font-semibold text-xs md:text-sm">Restaurant Manager - Urgent Cover</h3>
                      <p className="text-[10px] md:text-xs text-gray-400">El Paradiso Beach Club</p>
                      <p className="text-[10px] md:text-xs text-gray-500">Ibiza, Spain</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer stats - Compact and symmetrical */}
              <div className="flex justify-between items-center mt-2 md:mt-3 px-2 text-[8px] md:text-xs text-gray-400">
                <p>Updated every 5 minutes</p>
                <p>69 new positions added today</p>
                <p>Emergency updates in real-time</p>
                <p>7 active emergencies</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Minimalist Footer - Very compact */}
      <footer className="py-1 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm">
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
