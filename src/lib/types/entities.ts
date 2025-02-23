
import { BaseRole } from '../types';

export interface Company {
  id: string;
  profile_id: string;
  company_name: string;
  industry?: string;
  registration_number?: string;
  tax_id?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Agency {
  id: string;
  profile_id: string;
  agency_name: string;
  license_number?: string;
  service_areas?: Record<string, any>;
  specializations?: string[];
  verification_status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ShiftWorker {
  id: string;
  profile_id: string;
  hourly_rate?: number;
  years_experience?: number;
  verified: boolean;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkerCertification {
  id: string;
  worker_id: string;
  certification_name: string;
  issuing_authority?: string;
  issue_date?: string;
  expiry_date?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface WorkerLanguage {
  id: string;
  worker_id: string;
  language: string;
  proficiency_level: string;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  worker_id: string;
  title: string;
  description?: string;
  media_url?: string;
  media_type?: string;
  created_at: string;
  updated_at: string;
}
