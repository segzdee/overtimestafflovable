
export const formatRate = (original: number, currency: string, exchangeRates: Record<string, number>): string => {
  if (!exchangeRates[currency]) {
    console.error(`Exchange rate not found for currency: ${currency}`);
    return `${original}/hr`;
  }

  const rate = original * exchangeRates[currency];
  const symbol = currency === 'EUR' ? '€' : 
                currency === 'USD' ? '$' :
                currency === 'GBP' ? '£' :
                currency === 'AED' ? 'AED ' :
                currency === 'ZAR' ? 'R ' :
                currency === 'CAD' ? 'C$' : '';
  
  return `${symbol}${Math.round(rate)}/hr`;
};

export const DEFAULT_EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.1,
  GBP: 0.86,
  AED: 4.04,
  ZAR: 20.65,
  CAD: 1.48
};
