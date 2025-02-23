
export interface Profile {
  id: string;
  email: string;
  role: 'admin' | 'shift-worker' | 'company' | 'agency' | 'aiagent';
  name: string;
  category?: string;
  profile_complete: boolean;
  agency_name?: string;
  address?: string;
  phone_number?: string;
  specialization?: string;
  staffing_capacity?: number;
  avatar_url?: string;
  current_currency: string;
  theme_preference: string;
}

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
}

export type DatabaseError = {
  code: string;
  message: string;
  details?: string;
}
