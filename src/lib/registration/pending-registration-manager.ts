
import { RegistrationData, PendingRegistrationData } from './types';

export class PendingRegistrationManager {
  public readonly STORAGE_KEY = 'pending_registration';
  public readonly MAX_RETRIES = 3;
  
  /**
   * Save registration data for retry later
   */
  public savePendingRegistration(data: RegistrationData): void {
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
   */
  public getPendingRegistration(): PendingRegistrationData | null {
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
  public incrementPendingRegistrationAttempts(): void {
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
   * Check if there's a pending registration
   */
  public hasPendingRegistration(): boolean {
    return !!this.getPendingRegistration();
  }
}
