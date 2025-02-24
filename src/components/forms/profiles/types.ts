
export interface CompanyProfileFormData {
  name: string;
  address: string;
  phoneNumber: string;
  category: string;
  staffingCapacity?: number;
}

export interface AgencyProfileFormData {
  agencyName: string;
  address: string;
  phoneNumber: string;
  specialization: string;
  staffingCapacity: number;
  commissionRate?: number;
}

export interface FreelancerProfileFormData {
  name: string;
  address: string;
  phoneNumber: string;
  specialization: string;
  skills: string[];
  languages: string[];
  ratePerHour: number;
}
