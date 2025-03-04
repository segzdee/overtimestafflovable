
import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import LoginCards from '@/components/home/LoginCards';
import MarketUpdates from '@/components/home/MarketUpdates';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      <Header />

      {/* Main Content */}
      <div className="flex-grow">
        <HeroSection />
        <LoginCards />
        <MarketUpdates />
      </div>

      <Footer />
    </div>
  );
}
