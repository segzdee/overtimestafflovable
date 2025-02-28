
import { MarketUpdate, ExchangeRates } from '../types/marketUpdate';
import { formatRate } from '../utils/currencyUtils';
import { demoUpdates } from '../data/demoMarketUpdates';

export const fetchMarketUpdates = async (
  currency: string,
  exchangeRates: ExchangeRates
): Promise<MarketUpdate[]> => {
  // Use demo data instead of fetching
  return demoUpdates.map(update => ({
    ...update,
    rate: formatRate(update.original_rate, currency, exchangeRates)
  }));
};

export const subscribeToMarketUpdates = (
  currency: string,
  exchangeRates: ExchangeRates,
  onNewUpdate: (update: MarketUpdate) => void
) => {
  // Simulate updates every 30 seconds
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * demoUpdates.length);
    const newUpdate = {
      ...demoUpdates[randomIndex],
      id: `update-${Date.now()}`,
      rate: formatRate(demoUpdates[randomIndex].original_rate, currency, exchangeRates),
      isNew: true
    };
    onNewUpdate(newUpdate);
  }, 30000);
  
  // Return cleanup function
  return () => clearInterval(interval);
};
