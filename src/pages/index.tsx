
import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import LoginCards from '@/components/home/LoginCards';
import MarketUpdates from '@/components/home/MarketUpdates';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] overflow-hidden">
      <Header />

      {/* Main Content - Fixed height with flex-grow, no scrolling */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <HeroSection />
        <LoginCards />
        <MarketUpdates />
      </div>

      <Footer />
    </div>
  );
}
