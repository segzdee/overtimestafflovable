
export type BaseRole = 'admin' | 'shift-worker' | 'company' | 'agency' | 'aiagent';

export interface RoleAlias {
  id: string;
  base_role: BaseRole;
  alias: string;
  is_canonical: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationPreferences {
  id: number;
  userId: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  createdAt: string;
  updatedAt: string;
}
