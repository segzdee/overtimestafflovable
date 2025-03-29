
import { RegistrationData, PendingRegistrationData } from './types';
import * as crypto from 'crypto';

const ENCRYPTION_KEY = 'your-encryption-key'; // Replace with your actual encryption key
const IV_LENGTH = 16;

function encrypt(text: string): string {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string): string {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift()!, 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export class PendingRegistrationManager {
  public readonly STORAGE_KEY = 'pending_registration';
  public readonly MAX_RETRIES = 3;
  
  /**
   * Save registration data for retry later
   */
  public savePendingRegistration(data: RegistrationData): void {
    try {
      const encryptedData = encrypt(JSON.stringify({
        data,
        timestamp: new Date().toISOString(),
        attempts: 0
      }));
      localStorage.setItem(this.STORAGE_KEY, encryptedData);
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
      
      const decryptedData = decrypt(storedData);
      return JSON.parse(decryptedData);
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
      const encryptedData = encrypt(JSON.stringify({
        ...pendingData,
        attempts: (pendingData.attempts || 0) + 1
      }));
      localStorage.setItem(this.STORAGE_KEY, encryptedData);
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
