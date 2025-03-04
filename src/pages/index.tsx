
import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import LoginCards from '@/components/home/LoginCards';
import MarketUpdates from '@/components/home/MarketUpdates';
import HowItWorks from '@/components/home/HowItWorks';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Header />

      {/* Main Content */}
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto px-4">
          <HeroSection />
          <LoginCards />
          <MarketUpdates />
          <HowItWorks />
        </div>
      </div>

      <Footer />
    </div>
  );
}
