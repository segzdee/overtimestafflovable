
import React, { useState } from 'react';
import { HeaderNav } from '@/components/layout/HeaderNav';
import Footer from '@/components/layout/Footer';
import { MarketUpdates } from '@/components/market/MarketUpdates';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LiveMarket = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const regions = ['Global', 'Europe', 'Asia', 'Americas', 'Middle East'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Navigation Header */}
      <HeaderNav 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Live Hospitality Market</h1>
          <p className="text-gray-300 mt-2">Real-time shifts and positions across the global hospitality industry</p>
        </div>

        <div className="mb-6 flex justify-center">
          <Tabs defaultValue="all" className="w-full max-w-3xl" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
              <TabsTrigger value="all">All Positions</TabsTrigger>
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="swap" className="hidden md:block">Shift Swaps</TabsTrigger>
              <TabsTrigger value="new" className="hidden md:block">New Listings</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {regions.map(region => (
                <Badge 
                  key={region} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  {region}
                </Badge>
              ))}
            </div>

            <TabsContent value="all">
              <div className="bg-gray-800 rounded-lg p-4">
                <MarketUpdates />
              </div>
            </TabsContent>
            
            <TabsContent value="urgent">
              <div className="bg-gray-800 rounded-lg p-4">
                <MarketUpdates />
              </div>
            </TabsContent>
            
            <TabsContent value="premium">
              <div className="bg-gray-800 rounded-lg p-4">
                <MarketUpdates />
              </div>
            </TabsContent>
            
            <TabsContent value="swap">
              <div className="bg-gray-800 rounded-lg p-4">
                <MarketUpdates />
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="bg-gray-800 rounded-lg p-4">
                <MarketUpdates />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>All market data is refreshed every 5 minutes. Sign in for real-time updates and applications.</p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LiveMarket;
