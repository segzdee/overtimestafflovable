
import { useState, useEffect } from 'react';
import { MarketUpdate, ExchangeRates } from '../types/marketUpdate';
import { formatRate, DEFAULT_EXCHANGE_RATES } from '../utils/currencyUtils';
import { demoUpdates } from '../data/demoMarketUpdates';

export function useMarketUpdates() {
  const [updates, setUpdates] = useState<MarketUpdate[]>(demoUpdates);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [newUpdatesCount, setNewUpdatesCount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRates] = useState<ExchangeRates>(DEFAULT_EXCHANGE_RATES);

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
        
        // Instead of fetching data, use the demo data directly
        const formattedUpdates = demoUpdates.map(update => ({
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
      const randomIndex = Math.floor(Math.random() * demoUpdates.length);
      const newUpdate = {
        ...demoUpdates[randomIndex],
        id: `new-${Date.now()}`,
        rate: formatRate(demoUpdates[randomIndex].original_rate, selectedCurrency, exchangeRates),
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
  }, [selectedCurrency, exchangeRates]);

  return {
    updates,
    lastUpdateTime,
    newUpdatesCount,
    selectedCurrency,
    setSelectedCurrency,
    exchangeRates,
    isLoading
  };
}
