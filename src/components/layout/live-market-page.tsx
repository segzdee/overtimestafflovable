
import React, { useState } from 'react';
import { HeaderNav } from '@/components/layout/HeaderNav';
import Footer from '@/components/layout/Footer';
import { MarketUpdates } from '@/components/market/MarketUpdates';
import { EmergencyShiftIndex } from '@/components/market/EmergencyShiftIndex';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMarket } from '@/contexts/market/MarketContext';
import { useNavigate } from 'react-router-dom';

const LiveMarket = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { regions, selectedRegion, setSelectedRegion } = useMarket();
  const navigate = useNavigate();

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
                  variant={selectedRegion === region ? "default" : "outline"}
                  className="cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedRegion(region)}
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
                <EmergencyShiftIndex />
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

        <div className="text-center text-gray-400 text-sm mb-8">
          <p>All market data is refreshed every 5 minutes. Sign in for real-time updates and applications.</p>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => navigate('/find-shifts')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Find Shifts
          </Button>
          <Button 
            onClick={() => navigate('/find-staff')}
            variant="outline"
            className="text-white border-gray-600 hover:bg-gray-800"
          >
            Find Staff
          </Button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LiveMarket;
