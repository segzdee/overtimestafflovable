
import React, { Suspense, lazy } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import Footer from '@/components/layout/Footer';
import { PasswordProtection } from '@/components/ui/password-protection';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components for better initial load performance
const LoginCards = lazy(() => import('@/components/home/LoginCards'));
const MarketUpdates = lazy(() => import('@/components/home/MarketUpdates'));
const HowItWorks = lazy(() => import('@/components/home/HowItWorks'));

// Loading skeletons for lazy-loaded components
const LoginCardsSkeleton = () => (
  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
    {[...Array(3)].map((_, i) => (
      <Skeleton key={i} className="h-64 rounded-lg" />
    ))}
  </div>
);

const MarketUpdatesSkeleton = () => (
  <Skeleton className="w-full h-[500px] rounded-lg my-6" />
);

const HowItWorksSkeleton = () => (
  <div className="space-y-4 my-6">
    <Skeleton className="h-10 w-1/2 mx-auto" />
    <Skeleton className="h-6 w-3/4 mx-auto" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-64 rounded-lg" />
      ))}
    </div>
  </div>
);

export default function Home() {
  const content = (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f5]">
      <Header />

      {/* Main Content */}
      <main className="flex-grow overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 pt-2 md:pt-4 lg:pt-6">
          <HeroSection />
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<LoginCardsSkeleton />}>
              <LoginCards />
            </Suspense>
            
            <Suspense fallback={<MarketUpdatesSkeleton />}>
              <MarketUpdates />
            </Suspense>
            
            <Suspense fallback={<HowItWorksSkeleton />}>
              <HowItWorks />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );

  // Only apply password protection in development environment
  const isDev = import.meta.env.DEV;
  
  return isDev ? (
    <PasswordProtection password="8844" pageTitle="index">
      {content}
    </PasswordProtection>
  ) : (
    content
  );
}
