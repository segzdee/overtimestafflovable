
export interface MarketUpdate {
  id: string;
  type: 'URGENT' | 'NEW' | 'SWAP' | 'PREMIUM';
  title: string;
  location: string;
  rate: string;
  highlight: boolean;
  created_at: string;
  region: string;
  currency: string;
  original_rate: number;
  currency_rate: number;
  urgency_level: 'low' | 'medium' | 'high';
  isNew?: boolean;
  isUpdating?: boolean;
}

export type ExchangeRates = Record<string, number>;
