import { RegistrationData, RegistrationResult } from './types';
import { validateRegistrationData } from './validators';
import { PendingRegistrationManager } from './pending-registration-manager';
import { RegistrationClient } from './registration-client';
import { RegistrationErrorHandler } from './error-handler';

/**
 * Enhanced registration service with fallbacks, retries and offline support
 */
export class RegistrationService {
  private pendingManager: PendingRegistrationManager;
  private registrationClient: RegistrationClient;
  private errorHandler: RegistrationErrorHandler;
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
    
    this.pendingManager = new PendingRegistrationManager();
    this.registrationClient = new RegistrationClient();
    this.errorHandler = new RegistrationErrorHandler();
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
    const pendingData = this.pendingManager.getPendingRegistration();
    if (pendingData) {
      // Use pending data if available, otherwise use new data
      data = pendingData.data || data;
    }
    
    // Perform validation
    const validationResult = validateRegistrationData(data);
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
      const result = await this.registrationClient.registerViaEdgeFunction(data);
      
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
          error: this.errorHandler.getErrorMessage(edgeFunctionError),
          errorDetails: edgeFunctionError
        }
      );
      
      try {
        // Fall back to client-side registration
        const result = await this.registrationClient.registerViaClient(data);
        
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
          this.errorHandler.getErrorMessage(clientError)
        );
        
        // Store registration for later if it's a network error
        if (this.errorHandler.isNetworkError(clientError)) {
          this.pendingManager.savePendingRegistration(data);
          
          return {
            success: false,
            message: 'Registration temporarily saved due to network issues. We\'ll complete your registration when connection is restored.'
          };
        }
        
        // Otherwise return the error
        return {
          success: false,
          message: this.errorHandler.getErrorMessage(clientError)
        };
      }
    }
  }
  
  /**
   * Check for and process any pending registrations
   * Call this when the app starts and when connectivity is restored
   */
  public async processPendingRegistration(): Promise<RegistrationResult | null> {
    const pendingData = this.pendingManager.getPendingRegistration();
    if (!pendingData) {
      return null;
    }
    
    try {
      const result = await this.register(pendingData.data);
      
      if (result.success) {
        // Clear pending registration if successful
        this.pendingManager.clearPendingRegistration();
      }
      
      return result;
    } catch (error) {
      console.error('Failed to process pending registration:', error);
      
      // If we've exceeded max attempts, clear the pending registration
      if (pendingData.attempts >= this.pendingManager.MAX_RETRIES) {
        this.pendingManager.clearPendingRegistration();
        
        return {
          success: false,
          message: 'Registration failed after multiple attempts. Please try again.'
        };
      }
      
      // Otherwise increment attempt count
      this.pendingManager.incrementPendingRegistrationAttempts();
      
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
    return this.pendingManager.hasPendingRegistration();
  }
  
  /**
   * Get pending registration data
   * Made public to allow access from UI components
   */
  public getPendingRegistration() {
    return this.pendingManager.getPendingRegistration();
  }
  
  /**
   * Clear pending registration data
   * Made public to allow access from UI components
   */
  public clearPendingRegistration(): void {
    this.pendingManager.clearPendingRegistration();
  }
}

// Create a singleton instance
export const registrationService = new RegistrationService();
