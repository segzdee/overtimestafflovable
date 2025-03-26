
import { useState, useEffect } from 'react';

export type MarketUpdate = {
  id: string;
  type: 'URGENT' | 'PREMIUM' | 'SWAP' | 'REGULAR';
  title: string;
  location: string;
  region: string;
  rate: string;
  urgency_level: 'high' | 'medium' | 'low';
  highlight: boolean;
  isNew: boolean;
  isUpdating: boolean;
  timestamp: number;
};

export function useMarketUpdates(initialRegion = 'Global', initialCurrency = 'USD', refreshInterval = 60000) {
  const [updates, setUpdates] = useState<MarketUpdate[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [newUpdatesCount, setNewUpdatesCount] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.75,
    'AUD': 1.45,
    'CAD': 1.30
  });
  const [regions, setRegions] = useState(['Global', 'North America', 'Europe', 'Asia Pacific', 'Middle East', 'Africa']);
  
  // Load initial data
  useEffect(() => {
    fetchMarketData();
    
    // Set up refresh interval
    const intervalId = setInterval(() => {
      fetchMarketData();
    }, refreshInterval);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedRegion, selectedCurrency]);
  
  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      // In a real app, we'd fetch from an API
      // For now, we'll use demo data
      const demoShifts: MarketUpdate[] = [
        {
          id: 'demo-1',
          type: 'URGENT',
          title: 'Senior Bartender Needed',
          location: 'Grand Hotel & Resort',
          region: 'North America',
          rate: '$35/hr',
          urgency_level: 'high',
          highlight: true,
          isNew: false,
          isUpdating: false,
          timestamp: Date.now() - 1200000 // 20 minutes ago
        },
        {
          id: 'demo-2',
          type: 'PREMIUM',
          title: 'Event Host - Corporate Gala',
          location: 'City Convention Center',
          region: 'North America',
          rate: '$30/hr',
          urgency_level: 'medium',
          highlight: true,
          isNew: false,
          isUpdating: false,
          timestamp: Date.now() - 3600000 // 1 hour ago
        },
        {
          id: 'demo-3',
          type: 'SWAP',
          title: 'Wait Staff - Friday Night Shift',
          location: 'Oceanview Restaurant',
          region: 'North America',
          rate: '$25/hr',
          urgency_level: 'medium',
          highlight: false,
          isNew: false,
          isUpdating: false,
          timestamp: Date.now() - 7200000 // 2 hours ago
        },
        {
          id: 'demo-4',
          type: 'REGULAR',
          title: 'Kitchen Assistant',
          location: 'Downtown Bistro',
          region: 'Europe',
          rate: '€22/hr',
          urgency_level: 'low',
          highlight: false,
          isNew: false,
          isUpdating: false,
          timestamp: Date.now() - 14400000 // 4 hours ago
        }
      ];
      
      // Filter by region if not global
      const filteredUpdates = selectedRegion === 'Global' 
        ? [...demoShifts] 
        : demoShifts.filter(shift => shift.region === selectedRegion);
      
      // Update rates based on selected currency
      const updatedShifts = filteredUpdates.map(shift => ({
        ...shift,
        rate: formatCurrency(parseFloat(shift.rate.replace(/[^0-9.]/g, '')), selectedCurrency)
      }));
      
      setUpdates(updatedShifts);
      setLastUpdateTime(new Date());
      setNewUpdatesCount(prev => prev + Math.floor(Math.random() * 3));
    } catch (error) {
      console.error("Error fetching market data:", error);
      setUpdates([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatCurrency = (amount: number, currency: string) => {
    // Convert from USD to selected currency if needed
    const convertedAmount = amount * (exchangeRates[currency] || 1);
    
    // Format rates based on currency
    const currencySymbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'AUD': 'A$',
      'CAD': 'C$'
    };
    
    return `${currencySymbols[currency] || ''}${convertedAmount.toFixed(2)}/hr`;
  };
  
  return {
    updates,
    lastUpdateTime,
    newUpdatesCount,
    selectedCurrency,
    setSelectedCurrency,
    selectedRegion,
    setSelectedRegion,
    regions,
    exchangeRates,
    isLoading,
    refreshData: fetchMarketData
  };
}
