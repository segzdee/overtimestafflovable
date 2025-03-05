import { supabase } from '../supabase/client';
import { checkSupabaseConnection } from '../supabase/client';

interface RegistrationData {
  email: string;
  password: string;
  role: "company" | "agency" | "shift-worker" | "admin" | "aiagent";
  name: string;
  category?: string;
}

interface RegistrationResult {
  success: boolean;
  message: string;
  userId?: string;
  retryAfter?: number; // seconds until retry allowed (for rate limiting)
  needsVerification?: boolean;
}

/**
 * Enhanced registration service with fallbacks, retries and offline support
 */
export class RegistrationService {
  private readonly STORAGE_KEY = 'pending_registration';
  private readonly MAX_RETRIES = 3;
  private readonly EDGE_FUNCTION = 'secure-registration';
  private sendAuthDiagnostic: (eventType: string, userData: any, eventData: Record<string, any>) => Promise<boolean>;
  private processRegistration: (userId: string, email: string, role: string, additionalData: Record<string, any>) => Promise<boolean>;
  private monitorFailedRegistration: (email: string, errorMessage: string, ipAddress?: string) => Promise<boolean>;
  
  constructor(authHooks?: {
    sendAuthDiagnostic?: (eventType: string, userData: any, eventData: Record<string, any>) => Promise<boolean>;
    processRegistration?: (userId: string, email: string, role: string, additionalData: Record<string, any>) => Promise<boolean>;
    monitorFailedRegistration?: (email: string, errorMessage: string, ipAddress?: string) => Promise<boolean>;
  }) {
    // Use provided hooks or empty functions
    this.sendAuthDiagnostic = authHooks?.sendAuthDiagnostic || (async () => false);
    this.processRegistration = authHooks?.processRegistration || (async () => false);
    this.monitorFailedRegistration = authHooks?.monitorFailedRegistration || (async () => false);
  }
  
  /**
   * Set auth hooks after initialization
   */
  public setAuthHooks(authHooks: {
    sendAuthDiagnostic: (eventType: string, userData: any, eventData: Record<string, any>) => Promise<boolean>;
    processRegistration: (userId: string, email: string, role: string, additionalData: Record<string, any>) => Promise<boolean>;
    monitorFailedRegistration: (email: string, errorMessage: string, ipAddress?: string) => Promise<boolean>;
  }) {
    this.sendAuthDiagnostic = authHooks.sendAuthDiagnostic;
    this.processRegistration = authHooks.processRegistration;
    this.monitorFailedRegistration = authHooks.monitorFailedRegistration;
  }
  
  /**
   * Register a new user with fallback mechanisms
   */
  public async register(data: RegistrationData): Promise<RegistrationResult> {
    // Check if we have a pending registration
    const pendingData = this.getPendingRegistration();
    if (pendingData) {
      // Use pending data if available, otherwise use new data
      data = pendingData.data || data;
    }
    
    // Perform validation
    const validationResult = this.validateRegistrationData(data);
    if (!validationResult.valid) {
      // Monitor the failed registration
      await this.monitorFailedRegistration(
        data.email,
        validationResult.message || 'Invalid registration data'
      );
      
      return {
        success: false,
        message: validationResult.message || 'Invalid registration data'
      };
    }
    
    try {
      // Try using the Edge Function first (most reliable method)
      const result = await this.registerViaEdgeFunction(data);
      
      // Send auth diagnostic for successful registration
      if (result.success && result.userId) {
        await this.processRegistration(
          result.userId,
          data.email,
          data.role,
          { name: data.name, category: data.category }
        );
        
        await this.sendAuthDiagnostic(
          'registration_success',
          { userId: result.userId, email: data.email },
          { method: 'edge_function', role: data.role }
        );
      }
      
      return result;
    } catch (edgeFunctionError) {
      console.error('Edge function registration failed:', edgeFunctionError);
      
      // Send diagnostic for edge function failure
      await this.sendAuthDiagnostic(
        'registration_error',
        { email: data.email },
        { 
          method: 'edge_function',
          error: this.getErrorMessage(edgeFunctionError),
          errorDetails: edgeFunctionError
        }
      );
      
      try {
        // Fall back to client-side registration
        const result = await this.registerViaClient(data);
        
        // Send auth diagnostic for successful client registration
        if (result.success && result.userId) {
          await this.processRegistration(
            result.userId,
            data.email,
            data.role,
            { name: data.name, category: data.category }
          );
          
          await this.sendAuthDiagnostic(
            'registration_success',
            { userId: result.userId, email: data.email },
            { method: 'client_fallback', role: data.role }
          );
        }
        
        return result;
      } catch (clientError) {
        console.error('Client registration failed:', clientError);
        
        // Monitor the failed registration
        await this.monitorFailedRegistration(
          data.email,
          this.getErrorMessage(clientError)
        );
        
        // Store registration for later if it's a network error
        if (this.isNetworkError(clientError)) {
          this.savePendingRegistration(data);
          
          return {
            success: false,
            message: 'Registration temporarily saved due to network issues. We\'ll complete your registration when connection is restored.'
          };
        }
        
        // Otherwise return the error
        return {
          success: false,
          message: this.getErrorMessage(clientError)
        };
      }
    }
  }
  
  /**
   * Check for and process any pending registrations
   * Call this when the app starts and when connectivity is restored
   */
  public async processPendingRegistration(): Promise<RegistrationResult | null> {
    const pendingData = this.getPendingRegistration();
    if (!pendingData) {
      return null;
    }
    
    try {
      const result = await this.register(pendingData.data);
      
      if (result.success) {
        // Clear pending registration if successful
        this.clearPendingRegistration();
      }
      
      return result;
    } catch (error) {
      console.error('Failed to process pending registration:', error);
      
      // If we've exceeded max attempts, clear the pending registration
      if (pendingData.attempts >= this.MAX_RETRIES) {
        this.clearPendingRegistration();
        
        return {
          success: false,
          message: 'Registration failed after multiple attempts. Please try again.'
        };
      }
      
      // Otherwise increment attempt count
      this.incrementPendingRegistrationAttempts();
      
      return {
        success: false,
        message: 'Failed to process saved registration. Will retry later.'
      };
    }
  }
  
  /**
   * Check if there's a pending registration
   */
  public hasPendingRegistration(): boolean {
    return !!this.getPendingRegistration();
  }
  
  /**
   * Register using Supabase Edge Function
   */
  private async registerViaEdgeFunction(data: RegistrationData): Promise<RegistrationResult> {
    const { data: response, error } = await supabase.functions.invoke(
      this.EDGE_FUNCTION,
      {
        body: {
          ...data,
          redirectUrl: `${window.location.origin}/verify-email`
        }
      }
    );
    
    if (error) {
      throw error;
    }
    
    if (!response.success) {
      return {
        success: false,
        message: response.message,
        retryAfter: response.retry_after
      };
    }
    
    return {
      success: true,
      message: response.message,
      userId: response.userId,
      needsVerification: true
    };
  }
  
  /**
   * Register using client-side Supabase methods
   */
  private async registerViaClient(data: RegistrationData): Promise<RegistrationResult> {
    // Step 1: Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: data.role,
          category: data.category
        },
        emailRedirectTo: `${window.location.origin}/verify-email`
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    const user = authData.user;
    
    if (!user) {
      throw new Error('User creation failed');
    }
    
    try {
      // Step 2: Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: data.email,
          role: data.role,
          name: data.name,
          category: data.category,
          profile_complete: false
        });
      
      if (profileError) {
        throw profileError;
      }
      
      // Step 3: Create notification preferences
      const { error: prefError } = await supabase
        .from('notification_preferences')
        .insert({
          user_id: user.id,
          email: true,
          sms: false,
          push: true
        });
      
      if (prefError) {
        console.error('Failed to create notification preferences:', prefError);
        // Non-critical, continue
      }
      
      return {
        success: true,
        message: 'Registration successful. Please check your email to verify your account.',
        userId: user.id,
        needsVerification: true
      };
    } catch (profileError) {
      console.error('Profile creation error:', profileError);
      
      // Clean up auth user if profile creation failed
      try {
        await supabase.auth.signOut();
      } catch (signOutError) {
        console.error('Failed to sign out after failed registration:', signOutError);
      }
      
      throw profileError;
    }
  }
  
  /**
   * Validate registration data before submission
   */
  private validateRegistrationData(data: RegistrationData): { valid: boolean; message?: string } {
    if (!data.email || !data.password || !data.name || !data.role) {
      return {
        valid: false,
        message: 'Missing required fields'
      };
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return {
        valid: false,
        message: 'Invalid email format'
      };
    }
    
    if (data.password.length < 8) {
      return {
        valid: false,
        message: 'Password must be at least 8 characters'
      };
    }
    
    const validRoles = ['company', 'agency', 'shift-worker', 'admin', 'aiagent'];
    if (!validRoles.includes(data.role)) {
      return {
        valid: false,
        message: 'Invalid role'
      };
    }
    
    if ((data.role === 'company' || data.role === 'agency') && !data.category) {
      return {
        valid: false,
        message: `Category is required for ${data.role} accounts`
      };
    }
    
    return { valid: true };
  }
  
  /**
   * Save registration data for retry later
   */
  private savePendingRegistration(data: RegistrationData): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({
          data,
          timestamp: new Date().toISOString(),
          attempts: 0
        })
      );
    } catch (error) {
      console.error('Failed to save pending registration:', error);
    }
  }
  
  /**
   * Get pending registration data
   * Made public to allow access from UI components
   */
  public getPendingRegistration(): { data: RegistrationData; timestamp: string; attempts: number } | null {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (!storedData) return null;
      
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Failed to get pending registration:', error);
      return null;
    }
  }
  
  /**
   * Clear pending registration data
   * Made public to allow access from UI components
   */
  public clearPendingRegistration(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear pending registration:', error);
    }
  }
  
  /**
   * Increment attempt count for pending registration
   */
  private incrementPendingRegistrationAttempts(): void {
    const pendingData = this.getPendingRegistration();
    if (!pendingData) return;
    
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({
          ...pendingData,
          attempts: (pendingData.attempts || 0) + 1
        })
      );
    } catch (error) {
      console.error('Failed to update pending registration attempts:', error);
    }
  }
  
  /**
   * Helper to detect network errors
   */
  private isNetworkError(error: any): boolean {
    if (!error) return false;
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return (
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('Network request failed') ||
      errorMessage.includes('Network error') ||
      errorMessage.includes('network') ||
      errorMessage.includes('offline') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('timeout') ||
      navigator.onLine === false
    );
  }
  
  /**
   * Get user-friendly error message
   */
  private getErrorMessage(error: any): string {
    if (!error) return 'Unknown error occurred';
    
    if (error instanceof Error) {
      return error.message;
    }
    
    if (typeof error === 'object' && error !== null) {
      if ('message' in error) {
        return error.message as string;
      }
      if ('error_description' in error) {
        return error.error_description as string;
      }
      if ('error' in error && typeof error.error === 'string') {
        return error.error;
      }
    }
    
    return String(error);
  }
}

// Create a singleton instance
export const registrationService = new RegistrationService();
