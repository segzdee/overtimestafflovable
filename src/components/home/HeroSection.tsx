import React from 'react';
const HeroSection: React.FC = () => {
  return <section className="py-4 md:py-6">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 md:mb-2">AI Meets Hospitality</h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3">Extra Staff, Anytime, Anywhere</h2>
        <p className="text-sm md:text-md lg:text-lg mb-4 max-w-3xl mx-auto text-slate-950">
          Got extra time? Need extra shifts? No dinner staff coverage? Plan canceled? The OVERTIMESTAFF 
          Platform connects people with spare time to hospitality companies and agencies using smart AI 
          integration.
        </p>
      </div>
    </section>;
};
export default HeroSection;