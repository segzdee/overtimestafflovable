
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          AI Meets <span className="text-purple-600">Hospitality</span>
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
          Extra Staff, Anytime, Anywhere
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Got extra time? Need extra shifts? No dinner staff coverage? Plan canceled? The OVERTIMESTAFF 
          Platform connects people with spare time to hospitality companies and agencies using smart AI 
          integration.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
