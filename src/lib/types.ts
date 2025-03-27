
export type BaseRole = "shift-worker" | "company" | "agency" | "admin" | "aiagent";

export type RoleAlias = {
  [key: string]: BaseRole;
};

export interface NotificationPreferences {
  id: number;
  userId: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  createdAt: string;
  updatedAt: string;
}
