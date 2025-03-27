
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import MarketUpdates from '@/components/home/MarketUpdates';
import LoginCards from '@/components/home/LoginCards';
import { ContentWrapper } from '@/components/layout/ContentWrapper';

const Home = () => {
  return (
    <ContentWrapper>
      <HeroSection />
      <HowItWorks />
      <MarketUpdates />
      <LoginCards />
    </ContentWrapper>
  );
};

export default Home;
