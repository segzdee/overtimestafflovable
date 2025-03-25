
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
        <section className="py-8">
          <LoginCards />
        </section>
        
        {/* Market Updates */}
        <section className="py-8 bg-white">
          <MarketUpdates />
        </section>
        
        {/* How It Works */}
        <section className="py-8">
          <HowItWorks />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
