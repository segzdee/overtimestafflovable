
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { AuthUser } from "../types";

export const setUserFromSupabase = async (
  user: User,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
) => {
  if (!user) {
    setUser(null);
    return;
  }

  try {
    // Load profile data from profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
    }

    // Load notification preferences
    const { data: notificationPrefs, error: notificationError } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (notificationError && notificationError.code !== 'PGRST116') {
      console.error('Error fetching notification preferences:', notificationError);
    }

    // Combine data into user object
    const authUser: AuthUser = {
      id: user.id,
      email: user.email || '',
      role: profile?.role || user.app_metadata?.role || 'shift-worker',
      name: profile?.name || user.user_metadata?.name || '',
      verified: user.email_confirmed_at ? true : false,
      avatar: profile?.avatar_url || null,
      profileComplete: !!profile?.profile_completed_at,
      notificationPreferences: notificationPrefs || undefined
    };

    // Add additional profile fields if they exist
    if (profile) {
      if (profile.phone_number) authUser.phoneNumber = profile.phone_number;
      if (profile.address) authUser.address = profile.address;
      if (profile.specialization) authUser.specialization = profile.specialization;
      if (profile.staffing_capacity) authUser.staffingCapacity = profile.staffing_capacity;
      if (profile.category) authUser.category = profile.category;
      if (profile.agency_name) authUser.agencyName = profile.agency_name;
    }

    setUser(authUser);
  } catch (error) {
    console.error('Error setting user from Supabase:', error);
    // Set minimal user data in case of error
    setUser({
      id: user.id,
      email: user.email || '',
      role: user.app_metadata?.role || 'shift-worker',
      verified: user.email_confirmed_at ? true : false
    });
  }
};
