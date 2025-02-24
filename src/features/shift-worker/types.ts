
export interface Shift {
  id: string;
  title: string;
  pay_rate: number;
  remaining_time?: string;
  location: string;
  status: 'open' | 'emergency' | 'filled' | 'completed';
}
