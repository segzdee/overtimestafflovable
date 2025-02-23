
import { supabase } from "@/lib/supabase";
import type { AuthUser } from "@/types/auth";
import { User } from "@supabase/supabase-js";

export const setUserFromSupabase = async (supabaseUser: User): Promise<AuthUser | null> => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', supabaseUser.id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }

  if (!profile) return null;

  return {
    id: supabaseUser.id,
    email: supabaseUser.email!,
    role: profile.role,
    name: profile.name,
    category: profile.category || undefined,
    profileComplete: profile.profile_complete || false,
    agencyName: profile.agency_name || undefined,
    address: profile.address || undefined,
    phoneNumber: profile.phone_number || undefined,
    specialization: profile.specialization || undefined,
    staffingCapacity: profile.staffing_capacity || undefined,
    themePreference: profile.theme_preference || "light",
    lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
    currentCurrency: profile.current_currency || "USD",
    preferredCurrency: profile.preferred_currency || "USD"
  };
};

export const registerUser = async (
  email: string,
  password: string,
  role: AuthUser["role"],
  name: string,
  category?: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role, name, category }
    }
  });

  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          email,
          role,
          name,
          category,
          profile_complete: false,
          theme_preference: 'light',
          current_currency: 'USD',
          preferred_currency: 'USD'
        }
      ]);

    if (profileError) throw profileError;
  }

  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;

  if (data.user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError) throw profileError;

    return { user: data.user, profile };
  }

  return null;
};

export const updateUserProfile = async (userId: string, profileData: Partial<AuthUser>) => {
  // Convert profileData from camelCase to snake_case for database
  const dbProfileData = {
    ...profileData,
    profile_complete: profileData.profileComplete,
    agency_name: profileData.agencyName,
    phone_number: profileData.phoneNumber,
    staffing_capacity: profileData.staffingCapacity,
    theme_preference: profileData.themePreference,
    last_login: profileData.lastLogin,
    current_currency: profileData.currentCurrency,
    preferred_currency: profileData.preferredCurrency
  };

  const { error } = await supabase
    .from('profiles')
    .update({
      ...dbProfileData,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) throw error;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const verifyToken = async (token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'magiclink'
  });

  if (error) throw error;
  return data;
};
