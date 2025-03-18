
import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { Header } from '@/components/layout/Header';
import { HowItWorks } from '@/components/home/HowItWorks';
import { MarketUpdates } from '@/components/home/MarketUpdates';
import { LoginCards } from '@/components/home/LoginCards';
import { Footer } from '@/components/layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Market Updates */}
        <MarketUpdates />
        
        {/* Login Cards */}
        <LoginCards />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
