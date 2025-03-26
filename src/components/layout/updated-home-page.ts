// src/pages/index.tsx
import React, { useState } from 'react';
import { HeaderNav } from '@/components/layout/HeaderNav';
import HeroSection from '@/components/home/HeroSection';
import LoginCards from '@/components/home/LoginCards';
import MarketUpdates from '@/components/home/MarketUpdates';
import HowItWorks from '@/components/home/HowItWorks';
import Footer from '@/components/layout/Footer';
import { protectHomePageStructure } from '@/utils/homePageProtection';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Define the essential components for validation
  const homeComponents = {
    HeaderNav,
    HeroSection,
    LoginCards,
    MarketUpdates,
    HowItWorks,
    Footer
  };
  
  // Validate home page structure
  const { isValid, render } = protectHomePageStructure(homeComponents);
  
  // If validation fails, render the fallback
  if (!isValid && render) {
    return render();
  }
  
  // Otherwise, render the normal home page
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Header */}
      <HeaderNav 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Login Cards */}
        <section className="py-4">
          <LoginCards />
        </section>
        
        {/* Market Updates */}
        <section className="py-4 bg-white">
          <MarketUpdates />
        </section>
        
        {/* How It Works */}
        <section className="py-4">
          <HowItWorks />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;