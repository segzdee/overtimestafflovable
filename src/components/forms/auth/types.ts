
export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;
  category?: string;
  name?: string;
}

export interface AuthFormState {
  loading: boolean;
  error: string | null;
  networkError: boolean;
  successMessage: string | null;
}

export interface RegisterFormProps {
  onNetworkError?: (formData: AuthFormData) => void;
  pendingRegistration?: any;
  onRegistrationSuccess?: () => void;
  initialRole?: string;
}

export interface RegisterFormAlertsProps {
  error?: string;
  networkError?: boolean;
  successMessage?: string;
  retryRegistration?: () => void;
}
