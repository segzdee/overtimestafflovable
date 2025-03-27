
import { useState, useEffect } from 'react';
import demoShifts from '@/components/layout/demo-shifts-data';

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
    isLoading
  };
};
