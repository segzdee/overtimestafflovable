
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import { HeaderNav } from '@/components/layout/HeaderNav';
import HowItWorks from '@/components/home/HowItWorks';
import MarketUpdates from '@/components/home/MarketUpdates';
import LoginCards from '@/components/home/LoginCards';
import Footer from '@/components/layout/Footer';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
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
        <div className="py-4">
          <LoginCards />
        </div>
        
        {/* Market Updates */}
        <div className="py-4">
          <MarketUpdates />
        </div>
        
        {/* How It Works */}
        <div className="py-4">
          <HowItWorks />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
