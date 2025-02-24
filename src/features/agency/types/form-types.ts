
export interface InvoiceFormData {
  invoiceNumber: string;
  clientId: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
  }[];
  dueDate: Date;
  notes?: string;
}

export interface ExpenseFormData {
  category: string;
  amount: number;
  date: Date;
  description: string;
  receipt?: File;
}

export interface SearchFilterFormData {
  keywords: string;
  location?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  shiftType?: string[];
  payRate?: {
    min: number;
    max: number;
  };
}

export interface ContractFormData {
  contractType: string;
  startDate: Date;
  endDate?: Date;
  terms: string;
  attachments?: File[];
}

export interface MessageFormData {
  recipient: string;
  subject: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  attachments?: File[];
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  types: {
    shifts: boolean;
    payments: boolean;
    messages: boolean;
    system: boolean;
  };
}

export interface AvailabilityFormData {
  weeklySchedule: {
    [key: string]: {
      available: boolean;
      startTime?: string;
      endTime?: string;
    };
  };
  exceptions: {
    date: Date;
    available: boolean;
    note?: string;
  }[];
}
