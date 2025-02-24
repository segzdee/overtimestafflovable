
export interface FormData {
  name: string;
  agencyName: string;
  address: string;
  phoneNumber: string;
  specialization: string;
  staffingCapacity: number;
}

export interface AIToken {
  id: string;
  name: string;
  createdAt: string;
  isActive: boolean;
  authorizedBy: {
    id: string;
  };
}
