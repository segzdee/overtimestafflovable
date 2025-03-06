
export interface RegistrationData {
  email: string;
  password: string;
  role: "company" | "agency" | "shift-worker" | "admin" | "aiagent";
  name: string;
  category?: string;
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  userId?: string;
  retryAfter?: number; // seconds until retry allowed (for rate limiting)
  needsVerification?: boolean;
}

export interface PendingRegistrationData {
  data: RegistrationData;
  timestamp: string;
  attempts: number;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
}
