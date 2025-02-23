
import { supabase } from './client';
import { Profile, MarketUpdate } from './types';

export async function getCurrentProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data as Profile;
}

export async function updateProfile(profile: Partial<Profile>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('No user logged in');

  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;

  return data as Profile;
}

export async function uploadAvatar(file: File) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('No user logged in');

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${Math.random()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('public')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('public')
    .getPublicUrl(fileName);

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id);

  if (updateError) throw updateError;

  return publicUrl;
}

export async function getMarketUpdates() {
  const { data, error } = await supabase
    .from('market_updates')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) throw error;

  return data as MarketUpdate[];
}
