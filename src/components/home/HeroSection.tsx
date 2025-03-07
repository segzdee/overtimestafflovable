
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-20 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            The AI-Powered Hospitality Staffing Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect qualified staff with urgent shifts in minutes. Perfect for hotels, restaurants, and hospitality businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => navigate("/register")} 
              size="lg"
              className="bg-violet-700 hover:bg-violet-800 text-white font-medium text-base md:text-lg"
            >
              Sign Up Free <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button 
              onClick={() => navigate("/find-shifts")} 
              variant="outline" 
              size="lg"
              className="border-violet-600 text-violet-700 hover:text-violet-800 font-medium text-base md:text-lg"
            >
              Explore Available Shifts
            </Button>
          </div>
          <div className="mt-4 text-gray-500 text-sm">
            No credit card required • Free for employees
          </div>
        </div>
      </div>
      
      {/* Hero Background with optimized loading */}
      <div 
        className="absolute inset-0 -z-10 opacity-20 bg-gradient-to-tr from-violet-100 to-indigo-50" 
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroSection;
