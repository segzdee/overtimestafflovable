
import { supabase } from '../supabase/client';
import { RegistrationData, RegistrationResult } from './types';

export class RegistrationClient {
  private readonly EDGE_FUNCTION = 'secure-registration';
  
  /**
   * Register using Supabase Edge Function
   */
  public async registerViaEdgeFunction(data: RegistrationData): Promise<RegistrationResult> {
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
  public async registerViaClient(data: RegistrationData): Promise<RegistrationResult> {
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
}
