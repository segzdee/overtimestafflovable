
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-6 md:py-10 lg:py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-3 md:mb-4 leading-tight">
            AI Meets Hospitality
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4 text-gray-800 font-medium">
            Extra Staff, Anytime, Anywhere
          </h2>
          <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Got extra time? Need extra shifts? No dinner staff coverage? Plan canceled? The OVERTIMESTAFF 
            Platform connects people with spare time to hospitality companies and agencies using smart AI 
            integration.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/find-staff">
              <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base flex items-center gap-2">
                Find Extra Staff
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/find-shifts">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base">
                Find Extra Shifts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
