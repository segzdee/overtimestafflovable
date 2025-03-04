
import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import LoginCards from '@/components/home/LoginCards';
import MarketUpdates from '@/components/home/MarketUpdates';
import HowItWorks from '@/components/home/HowItWorks';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f5]">
      <Header />

      {/* Main Content */}
      <main className="flex-grow overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 pt-2 md:pt-4 lg:pt-6">
          <HeroSection />
          <div className="max-w-7xl mx-auto">
            <LoginCards />
            <MarketUpdates />
            <HowItWorks />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
