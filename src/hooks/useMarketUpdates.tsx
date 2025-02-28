
import { useState, useEffect } from 'react';
import { MarketUpdate, ExchangeRates } from '../types/marketUpdate';
import { formatRate, DEFAULT_EXCHANGE_RATES } from '../utils/currencyUtils';
import { demoUpdates } from '../data/demoMarketUpdates';

export function useMarketUpdates() {
  const [updates, setUpdates] = useState<MarketUpdate[]>(demoUpdates);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [newUpdatesCount, setNewUpdatesCount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRates] = useState<ExchangeRates>(DEFAULT_EXCHANGE_RATES);

  // Get unique regions for filtering
  const regions = ['All', ...Array.from(new Set(demoUpdates.map(update => {
    // Extract country from region
    const regionParts = update.region.split(',');
    if (regionParts.length > 1) {
      return regionParts[1].trim(); // Return country name
    }
    // For entries without country in region field, use the full region
    return update.region;
  })))];

  // Update all rates when currency changes
  useEffect(() => {
    setUpdates(prevUpdates =>
      prevUpdates.map(update => ({
        ...update,
        rate: formatRate(update.original_rate, selectedCurrency, exchangeRates)
      }))
    );
  }, [selectedCurrency, exchangeRates]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        
        // Filter updates based on selected region
        let filteredUpdates = demoUpdates;
        if (selectedRegion !== 'All') {
          filteredUpdates = demoUpdates.filter(update => 
            update.region.includes(selectedRegion)
          );
        }
        
        const formattedUpdates = filteredUpdates.map(update => ({
          ...update,
          rate: formatRate(update.original_rate, selectedCurrency, exchangeRates),
          isNew: false
        }));
        
        setUpdates(formattedUpdates);
        setLastUpdateTime(new Date());
        setNewUpdatesCount(formattedUpdates.length);
      } catch (error) {
        console.error('Error initializing market updates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const simulateNewUpdate = () => {
      // Only simulate updates for the selected region
      const eligibleUpdates = selectedRegion === 'All' 
        ? demoUpdates 
        : demoUpdates.filter(update => update.region.includes(selectedRegion));
      
      if (eligibleUpdates.length === 0) return;
      
      const randomIndex = Math.floor(Math.random() * eligibleUpdates.length);
      const newUpdate = {
        ...eligibleUpdates[randomIndex],
        id: `new-${Date.now()}`,
        rate: formatRate(eligibleUpdates[randomIndex].original_rate, selectedCurrency, exchangeRates),
        isNew: true
      };
      
      setUpdates(prev => [newUpdate, ...prev.slice(0, -1)]);
      setNewUpdatesCount(prev => prev + 1);
      setLastUpdateTime(new Date());
      
      setTimeout(() => {
        setUpdates(prevUpdates => 
          prevUpdates.map(update => 
            update.id === newUpdate.id ? { ...update, isNew: false } : update
          )
        );
      }, 300);
    };

    initializeData();
    
    // Simulate new updates every 30 seconds
    const interval = setInterval(simulateNewUpdate, 30000);
    
    return () => clearInterval(interval);
  }, [selectedCurrency, exchangeRates, selectedRegion]);

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
    isLoading
  };
}
