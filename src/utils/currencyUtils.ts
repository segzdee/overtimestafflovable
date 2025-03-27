// Type definition for exchange rates
export type ExchangeRates = Record<string, number>;

// Function to format a rate based on currency and exchange rates
export const formatRate = (
  original: number,
  currency: string,
  exchangeRates: ExchangeRates
): string => {
  // Check if the exchange rate for the given currency exists
  if (!exchangeRates[currency]) {
    throw new Error(`Exchange rate not found for currency: ${currency}`);
  }

  // Calculate the converted rate
  const rate = original * exchangeRates[currency];

  // Map of currency symbols
  const currencySymbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    AED: 'AED ',
    ZAR: 'R ',
    CAD: 'C$',
  };

  // Get the symbol for the given currency or default to an empty string
  const symbol = currencySymbols[currency] || '';

  // Return the formatted rate
  return `${symbol}${Math.round(rate)}/hr`;
};

// Default exchange rates
export const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  EUR: 1,
  USD: 1.1,
  GBP: 0.86,
  AED: 4.04,
  ZAR: 20.65,
  CAD: 1.48,
};
