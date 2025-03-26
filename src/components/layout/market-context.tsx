
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useMarketUpdates, type MarketUpdate } from '@/services/marketData.service';

interface MarketContextType {
  updates: MarketUpdate[];
  emergencyUpdates: MarketUpdate[];
  premiumUpdates: MarketUpdate[];
  regularUpdates: MarketUpdate[];
  swapUpdates: MarketUpdate[];
  isLoading: boolean;
  lastUpdateTime: Date;
  newUpdatesCount: number;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  regions: string[];
  exchangeRates: Record<string, number>;
  refreshData: () => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const marketData = useMarketUpdates();
  
  // Derived state - filtered updates by type
  const emergencyUpdates = marketData.updates.filter(update => update.type === 'URGENT');
  const premiumUpdates = marketData.updates.filter(update => update.type === 'PREMIUM');
  const regularUpdates = marketData.updates.filter(update => update.type === 'REGULAR');
  const swapUpdates = marketData.updates.filter(update => update.type === 'SWAP');
  
  // Create a version that automatically refreshes market data
  useEffect(() => {
    // Refresh every 5 minutes
    const intervalId = setInterval(() => {
      marketData.refreshData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const contextValue: MarketContextType = {
    ...marketData,
    emergencyUpdates,
    premiumUpdates,
    regularUpdates,
    swapUpdates
  };
  
  return (
    <MarketContext.Provider value={contextValue}>
      {children}
    </MarketContext.Provider>
  );
}

// Hook to use the market context
export function useMarket() {
  const context = useContext(MarketContext);
  
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  
  return context;
}
