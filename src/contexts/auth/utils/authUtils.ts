
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { AuthUser } from "../types";

export const setUserFromSupabase = async (supabaseUser: User, setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', supabaseUser.id)
    .single();

  if (profile) {
    setUser({
      id: supabaseUser.id,
      email: supabaseUser.email!,
      role: profile.role,
      name: profile.name,
      category: profile.category,
      profileComplete: profile.profile_complete,
      agencyName: profile.agency_name,
      address: profile.address,
      phoneNumber: profile.phone_number,
      specialization: profile.specialization,
      staffingCapacity: profile.staffing_capacity
    });
  }
};

export const DEV_PASSWORD = 'king8844';
