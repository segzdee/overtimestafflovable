
import { useState, useEffect } from 'react';
import { MarketUpdate, ExchangeRates } from '../types/marketUpdate';
import { formatRate, DEFAULT_EXCHANGE_RATES } from '../utils/currencyUtils';
import { demoUpdates } from '../data/demoMarketUpdates';
import { subscribeToMarketUpdates, fetchMarketUpdates } from '../services/marketUpdateService';

export function useMarketUpdates() {
  const [updates, setUpdates] = useState<MarketUpdate[]>(demoUpdates);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [newUpdatesCount, setNewUpdatesCount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const [isLoading, setIsLoading] = useState(false);
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
        const data = await fetchMarketUpdates(selectedCurrency, exchangeRates);
        
        if (data) {
          setUpdates(data);
          setLastUpdateTime(new Date());

          // Remove isNew flag after animation
          setTimeout(() => {
            setUpdates(prevUpdates => 
              prevUpdates.map(update => ({ ...update, isNew: false }))
            );
          }, 300);
        }
      } catch (error) {
        console.error('Error initializing market updates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const cleanup = subscribeToMarketUpdates(
      selectedCurrency,
      exchangeRates,
      (newUpdate) => {
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
      },
      (updatedMarket) => {
        setUpdates(prev => prev.map(update => {
          if (update.id === updatedMarket.id) {
            return updatedMarket;
          }
          return update;
        }));
        
        setTimeout(() => {
          setUpdates(prevUpdates => 
            prevUpdates.map(update => 
              update.id === updatedMarket.id ? { ...update, isUpdating: false } : update
            )
          );
        }, 300);
      }
    );

    initializeData();
    
    return cleanup;
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
