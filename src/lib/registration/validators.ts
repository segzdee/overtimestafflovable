
import { RegistrationData, ValidationResult } from './types';

/**
 * Validate registration data before submission
 */
export function validateRegistrationData(data: RegistrationData): ValidationResult {
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
