import React, { useState } from 'react';
import { HeaderNav } from '@/components/layout/HeaderNav';
import HeroSection from '@/components/home/HeroSection';
import LoginCards from '@/components/home/LoginCards';
import MarketUpdates from '@/components/home/MarketUpdates';
import HowItWorks from '@/components/home/HowItWorks';
import Footer from '@/components/layout/Footer';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Header */}
      <HeaderNav 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        aria-label="Main Navigation"
      />
      
      {/* Main Content */}
      <main className="flex-1" role="main">
        <HeroSection />
        <section className="py-4" aria-labelledby="login-cards-section">
          <h2 id="login-cards-section" className="sr-only">Login Options</h2>
          <LoginCards />
        </section>
        <section className="py-4 bg-white" aria-labelledby="market-updates-section">
          <h2 id="market-updates-section" className="sr-only">Market Updates</h2>
          <MarketUpdates />
        </section>
        <section className="py-4" aria-labelledby="how-it-works-section">
          <h2 id="how-it-works-section" className="sr-only">How It Works</h2>
          <HowItWorks />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
