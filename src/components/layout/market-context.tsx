
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MarketUpdate } from '@/types/marketUpdate';
import { demoMarketUpdates } from '@/data/demoMarketUpdates';
import { marketUpdateService } from '@/services/marketUpdateService';

interface MarketContextType {
  marketUpdates: MarketUpdate[];
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};

interface MarketProviderProps {
  children: ReactNode;
  useDemoData?: boolean; // To enable demo data for development
}

export const MarketProvider: React.FC<MarketProviderProps> = ({ 
  children, 
  useDemoData = false 
}) => {
  const [marketUpdates, setMarketUpdates] = useState<MarketUpdate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  // Function to refresh data
  const refreshData = () => {
    if (hasInitialized) {
      fetchMarketData();
    }
  };

  // Function to fetch market data
  const fetchMarketData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (useDemoData) {
        // Use demo data with a simulated delay
        setTimeout(() => {
          setMarketUpdates(demoMarketUpdates);
          setLoading(false);
        }, 1000);
      } else {
        // Fetch real data from the service
        const updates = await marketUpdateService.getMarketUpdates();
        setMarketUpdates(updates);
      }
    } catch (err) {
      console.error('Error fetching market updates:', err);
      setError('Failed to load market updates. Please try again later.');
    } finally {
      if (!useDemoData) {
        setLoading(false);
      }
    }
  };

  // Initialize data on mount
  useEffect(() => {
    fetchMarketData();
    setHasInitialized(true);

    // Set up polling interval for real-time updates if not using demo data
    if (!useDemoData) {
      const intervalId = setInterval(fetchMarketData, 60000); // Refresh every minute
      
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [useDemoData]);

  return (
    <MarketContext.Provider 
      value={{ 
        marketUpdates, 
        loading, 
        error,
        refreshData
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};
