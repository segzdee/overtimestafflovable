
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, UserCircle, Building2, Building } from 'lucide-react';

const LoginCards: React.FC = () => {
  return (
    <section className="py-4 md:py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">
          Choose Your Account Type
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Staffing Agency Card */}
          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full transform hover:-translate-y-1">
            <CardContent className="p-4 md:p-6 flex flex-col items-center justify-between h-full">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-7 w-7 text-green-600" />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-base md:text-lg font-semibold mb-2">Staffing Agency</h3>
                <p className="text-sm text-gray-600 mb-4">Manage Multiple Venues and Staff</p>
              </div>
              <Link to="/login?type=agency" className="w-full">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 text-sm sm:text-base">
                  LOGIN
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Hotels & Businesses Card */}
          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full transform hover:-translate-y-1">
            <CardContent className="p-4 md:p-6 flex flex-col items-center justify-between h-full">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Building className="h-7 w-7 text-blue-600" />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-base md:text-lg font-semibold mb-2">Hotels & Businesses</h3>
                <p className="text-sm text-gray-600 mb-4">Post shifts and hire Extra Staff</p>
              </div>
              <Link to="/login?type=company" className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2 text-sm sm:text-base">
                  LOGIN
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Shift Workers Card */}
          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full transform hover:-translate-y-1">
            <CardContent className="p-4 md:p-6 flex flex-col items-center justify-between h-full">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <UserCircle className="h-7 w-7 text-purple-600" />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-base md:text-lg font-semibold mb-2">Shift Workers</h3>
                <p className="text-sm text-gray-600 mb-4">Clock-In for Extra Shifts</p>
              </div>
              <Link to="/login?type=shift-worker" className="w-full">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white py-2 text-sm sm:text-base">
                  LOGIN
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* AI Agent Card */}
          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full transform hover:-translate-y-1">
            <CardContent className="p-4 md:p-6 flex flex-col items-center justify-between h-full">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Bot className="h-7 w-7 text-indigo-600" />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-base md:text-lg font-semibold mb-2">AI Agent</h3>
                <p className="text-sm text-gray-600 mb-4">Activate Agent for Automation</p>
              </div>
              <Link to="/login?type=ai-agent" className="w-full">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white py-2 text-sm sm:text-base">
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
