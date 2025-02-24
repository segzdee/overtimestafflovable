
import { PostgrestError } from "@supabase/supabase-js";
import { AuthUser } from "../types";
import { supabase } from "@/lib/supabase/client";

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

    // Set the authenticated user with profile data
    setUser({
      id: profile.id,
      email: profile.email,
      role: profile.role,
      name: profile.name,
      profileComplete: profile.profile_complete,
      emailVerified: supabaseUser.email_confirmed_at ? true : false,
      verificationStatus: 'pending',
      notificationPreferences: {}
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
  return await supabase.from('profiles').insert({
    id: userId,
    email,
    role,
    name,
    profile_complete: false
  });
};
