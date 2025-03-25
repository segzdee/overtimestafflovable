
// User role types
export type BaseRole = "shift-worker" | "company" | "agency" | "admin" | "aiagent";

// Notification preference types
export interface NotificationPreferences {
  id: number;
  userId: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  createdAt: string;
  updatedAt: string;
}
