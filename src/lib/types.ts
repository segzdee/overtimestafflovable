
export type BaseRole = 'shift-worker' | 'agency' | 'company' | 'aiagent' | 'admin';

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

export interface AIAgentToken {
  id: number;
  agentId: string;
  token: string;
  expiresAt: string;
  lastUsed?: string;
  isRevoked: boolean;
  createdAt: string;
}

export interface AIAgentPermission {
  id: number;
  agentId: string;
  companyId: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AIAgentAuditLog {
  id: number;
  agentId: string;
  action: string;
  details?: string;
  status: string;
  ipAddress?: string;
  timestamp: string;
}
