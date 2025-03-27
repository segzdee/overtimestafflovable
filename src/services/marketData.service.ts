
import { useState, useEffect } from 'react';
import demoShifts from '@/components/layout/demo-shifts-data';

// Define the types needed by market-context.tsx
export interface MarketStats {
  totalShifts: number;
  totalAgencies: number;
  totalWorkers: number;
  averageShiftRate: number;
}

export interface MarketTrend {
  id: string;
  period: string;
  shiftCount: number;
  rateChange: number;
}

export interface HotSkill {
  id: string;
  name: string;
  demandLevel: number;
  rateRange: string;
}

export interface LocationDemand {
  id: string;
  city: string;
  state: string;
  demandScore: number;
}

export interface ShiftDemandByDay {
  day: string;
  demandCount: number;
}

export interface ShiftRateBySkill {
  skill: string;
  averageRate: number;
}

// Mock data fetching functions
export const fetchMarketStats = async (): Promise<MarketStats> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    totalShifts: 2356,
    totalAgencies: 142,
    totalWorkers: 8723,
    averageShiftRate: 28.75,
  };
};

export const fetchMarketTrends = async (): Promise<MarketTrend[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { id: '1', period: 'Last Week', shiftCount: 870, rateChange: 2.3 },
    { id: '2', period: 'Last Month', shiftCount: 3450, rateChange: 5.8 },
    { id: '3', period: 'Last Quarter', shiftCount: 10200, rateChange: 8.2 },
  ];
};

export const fetchHotSkills = async (): Promise<HotSkill[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { id: '1', name: 'Bartender', demandLevel: 95, rateRange: '$25-35/hr' },
    { id: '2', name: 'Event Host', demandLevel: 88, rateRange: '$22-30/hr' },
    { id: '3', name: 'Chef', demandLevel: 82, rateRange: '$30-45/hr' },
  ];
};

export const fetchLocationDemand = async (): Promise<LocationDemand[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { id: '1', city: 'New York', state: 'NY', demandScore: 98 },
    { id: '2', city: 'Los Angeles', state: 'CA', demandScore: 92 },
    { id: '3', city: 'Chicago', state: 'IL', demandScore: 85 },
  ];
};

export const fetchShiftDemandByDay = async (): Promise<ShiftDemandByDay[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { day: 'Monday', demandCount: 145 },
    { day: 'Tuesday', demandCount: 132 },
    { day: 'Wednesday', demandCount: 158 },
    { day: 'Thursday', demandCount: 175 },
    { day: 'Friday', demandCount: 210 },
    { day: 'Saturday', demandCount: 245 },
    { day: 'Sunday', demandCount: 190 },
  ];
};

export const fetchShiftRatesBySkill = async (): Promise<ShiftRateBySkill[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { skill: 'Bartender', averageRate: 32.50 },
    { skill: 'Server', averageRate: 25.75 },
    { skill: 'Host', averageRate: 22.80 },
    { skill: 'Chef', averageRate: 40.25 },
  ];
};

export const useMarketUpdates = () => {
  const [updates, setUpdates] = useState(demoShifts);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedRegion, setSelectedRegion] = useState('North America');
  const [isLoading, setIsLoading] = useState(false);

  const regions = ['North America', 'Europe', 'Asia Pacific', 'Middle East'];
  const exchangeRates = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.75,
    'AUD': 1.3,
    'CAD': 1.25
  };

  // Simulate loading real data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLastUpdateTime(new Date());
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [selectedRegion, selectedCurrency]);

  return {
    updates,
    lastUpdateTime,
    selectedCurrency,
    setSelectedCurrency,
    selectedRegion,
    setSelectedRegion,
    regions,
    exchangeRates,
    isLoading,
    refreshData: () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setLastUpdateTime(new Date());
      }, 1000);
    }
  };
};
