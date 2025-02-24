
import { PostgrestError } from "@supabase/supabase-js";
import { AuthUser } from "../types";
import { supabase } from "@/lib/supabase/client";
import { NotificationPreferences } from "@/lib/types";

export const setUserFromSupabase = async (
  supabaseUser: any,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
) => {
  if (!supabaseUser) {
    setUser(null);
    return;
  }

  try {
    // Get the user's profile from our profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    if (error) throw error;

    if (!profile) {
      console.error('No profile found for user:', supabaseUser.id);
      setUser(null);
      return;
    }

    // Get or create notification preferences
    let { data: notificationPrefs, error: prefError } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', profile.id)
      .single();

    if (prefError && prefError.code === 'PGRST116') {
      // If preferences don't exist, create them with defaults
      const { data: newPrefs, error: createError } = await supabase
        .from('notification_preferences')
        .insert({
          user_id: profile.id,
          email: true,
          sms: false,
          push: true
        })
        .select()
        .single();

      if (createError) throw createError;
      notificationPrefs = newPrefs;
    } else if (prefError) {
      throw prefError;
    }

    // Set the authenticated user with profile data
    setUser({
      id: profile.id,
      email: profile.email,
      role: profile.role,
      name: profile.name,
      profileComplete: profile.profile_complete,
      emailVerified: supabaseUser.email_confirmed_at ? true : false,
      verificationStatus: 'pending',
      notificationPreferences: notificationPrefs
    });
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    setUser(null);
  }
};

export const createUserProfile = async (
  userId: string,
  email: string,
  role: AuthUser["role"],
  name: string
): Promise<{ data: any; error: PostgrestError | null }> => {
  // Create user profile
  const { error: profileError } = await supabase.from('profiles').insert({
    id: userId,
    email,
    role,
    name,
    profile_complete: false
  });

  if (profileError) return { data: null, error: profileError };

  // Create default notification preferences
  const { data: prefsData, error: prefsError } = await supabase
    .from('notification_preferences')
    .insert({
      user_id: userId,
      email: true,
      sms: false,
      push: true
    })
    .select();

  return { data: prefsData, error: prefsError };
};
