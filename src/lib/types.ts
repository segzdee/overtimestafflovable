
export type BaseRole = 'admin' | 'shift-worker' | 'company' | 'agency' | 'aiagent';

export interface NotificationPreferences {
  id: number;
  userId: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  createdAt: string;
  updatedAt: string;
}
