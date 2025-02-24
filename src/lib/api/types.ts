
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export interface TenantCreate {
  name: string;
  email: string;
  type: 'agency' | 'company' | 'shift-worker';
  metadata?: Record<string, any>;
}

export interface UserCreate {
  email: string;
  name: string;
  role: string;
  tenant_id: string;
}

export interface ShiftCreate {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  hourly_rate: number;
  location: string;
  required_skills?: string[];
  tenant_id: string;
}

export interface ApplicationCreate {
  shift_id: string;
  applicant_id: string;
  cover_note?: string;
}
