
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, UserCircle, Building2, Building } from 'lucide-react';

const LoginCards: React.FC = () => {
  return (
    <section className="py-2 md:py-3">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-5xl mx-auto">
          {/* Staffing Agency Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
            <CardContent className="p-2 sm:p-3 md:p-4 flex flex-col items-center justify-between h-full">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mt-2 md:mt-4 mb-1 md:mb-3">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold mb-0">Staffing Agency</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-1 sm:mb-2 md:mb-4">Manage Multiple Venues and Staff</p>
              </div>
              <Link to="/login?type=agency" className="w-full">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-[10px] sm:text-xs md:text-sm py-0.5 sm:py-1 md:py-2 text-zinc-50">
                  LOGIN
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Hotels & Businesses Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
            <CardContent className="p-2 sm:p-3 md:p-4 flex flex-col items-center justify-between h-full">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mt-2 md:mt-4 mb-1 md:mb-3">
                <Building className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold mb-0">Hotels & Businesses</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-1 sm:mb-2 md:mb-4">Post shifts and hire Extra Staff</p>
              </div>
              <Link to="/login?type=company" className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-[10px] sm:text-xs md:text-sm py-0.5 sm:py-1 md:py-2 text-zinc-50">
                  LOGIN
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Shift Workers Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
            <CardContent className="p-2 sm:p-3 md:p-4 flex flex-col items-center justify-between h-full">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mt-2 md:mt-4 mb-1 md:mb-3">
                <UserCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold mb-0">Shift Workers</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-1 sm:mb-2 md:mb-4">Clock-In for Extra Shifts</p>
              </div>
              <Link to="/login?type=shift-worker" className="w-full">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 text-[10px] sm:text-xs md:text-sm py-0.5 sm:py-1 md:py-2">
                  LOGIN
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* AI Agent Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
            <CardContent className="p-2 sm:p-3 md:p-4 flex flex-col items-center justify-between h-full">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-indigo-100 rounded-full flex items-center justify-center mt-2 md:mt-4 mb-1 md:mb-3">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-indigo-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold mb-0">AI Agent</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-1 sm:mb-2 md:mb-4">Activate Agent for Automation</p>
              </div>
              <Link to="/login?type=ai-agent" className="w-full">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white hover:from-indigo-600 hover:to-indigo-800 text-[10px] sm:text-xs md:text-sm py-0.5 sm:py-1 md:py-2">
                  LOGIN
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoginCards;
