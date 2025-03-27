import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 md:py-10 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
            AI Meets Hospitality
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-3">
            Extra Staff, Anytime, Anywhere
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-5 max-w-3xl mx-auto">
            Got extra time? Need extra shifts? No dinner staff coverage? Plan canceled? The OVERTIMESTAFF Platform connects 
            people with spare time to hospitality companies and agencies using smart AI integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => navigate("/registration")} // Updated to link to the registration page
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-medium text-base md:text-lg"
            >
              Registration <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button 
              onClick={() => navigate("/live-market")} // Updated to link to the live market
              variant="outline" 
              size="lg"
              className="border-purple-600 text-purple-700 hover:text-purple-800 font-medium text-base md:text-lg"
            >
              Explore Available Shifts
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hero Background with optimized loading */}
      <div 
        className="absolute inset-0 -z-10 opacity-20 bg-gradient-to-tr from-purple-100 to-indigo-50" 
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroSection;
