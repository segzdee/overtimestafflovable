import { AuthUser } from "@/contexts/auth/types";
import { BaseRole } from "@/lib/types";

// Interface to match the user registration schema
interface UserRegistrationData {
  email: string;
  password: string;
  role: BaseRole;
  name: string;
  category?: string;
}

// Mock registration function that would interact with the auth schema
export async function registerUser(userData: UserRegistrationData): Promise<AuthUser> {
  try {
    // For demo purposes, we're creating a mock user
    // In a real implementation, this would call an API endpoint that handles
    // inserting the data into auth.users and the appropriate profile table
    
    console.log('Registration data to be sent to server:', userData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check network connection - simulate offline registration issue
    if (!navigator.onLine) {
      throw new Error('network_error: Unable to connect to server. Your registration will be stored for completion when online.');
    }
    
    // Normally, would insert into auth.users and appropriate profile table based on role
    // For demo, we create a user object that matches AuthUser type
    const newUser: AuthUser = {
      id: `user_${Date.now()}`,
      email: userData.email,
      role: userData.role,
      name: userData.name,
      category: userData.category,
      profileComplete: false,
      verificationStatus: 'pending',
      emailVerified: false,
      notificationPreferences: {
        id: Math.floor(Math.random() * 1000),
        userId: `user_${Date.now()}`,
        email: true,
        sms: false,
        push: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
    
    // In a real implementation, we would return the user data from the server
    return newUser;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Mock login function that would check auth.users table
export async function loginUser(email: string, password: string): Promise<AuthUser> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real implementation, this would verify credentials against auth.users
    // and return the appropriate user data with role-specific profile
    
    // For demo purposes, we're checking localStorage
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email) {
        // In a real implementation, we would verify the password hash
        return parsedUser;
      }
    }
    
    throw new Error('Invalid email or password');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Function to handle storing registration data for offline usage
export function storeRegistrationForLater(userData: UserRegistrationData): void {
  try {
    localStorage.setItem('pending_registration', JSON.stringify({
      ...userData,
      timestamp: new Date().toISOString()
    }));
    console.log('Registration data stored for later submission');
  } catch (error) {
    console.error('Error storing registration data:', error);
  }
}

// Function to check for and process pending registrations
export function checkPendingRegistrations(): UserRegistrationData | null {
  try {
    const pendingData = localStorage.getItem('pending_registration');
    if (pendingData) {
      return JSON.parse(pendingData);
    }
    return null;
  } catch (error) {
    console.error('Error checking pending registrations:', error);
    return null;
  }
}

// Function to clear pending registration after successful processing
export function clearPendingRegistration(): void {
  localStorage.removeItem('pending_registration');
}
