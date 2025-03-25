
import { supabase } from './client';

export interface AIToken {
  id: string;
  name: string;
  provider: string;
  createdAt: string;
  isActive: boolean;
}

export async function saveAIToken(name: string, token: string, provider: string): Promise<AIToken | null> {
  try {
    const { data, error } = await supabase
      .from('ai_tokens')
      .insert([
        { name, token, provider, is_active: true }
      ])
      .select('id, name, provider, created_at, is_active')
      .single();

    if (error) throw error;
    
    return data ? {
      id: data.id,
      name: data.name,
      provider: data.provider,
      createdAt: data.created_at,
      isActive: data.is_active
    } : null;
  } catch (error) {
    console.error('Error saving AI token:', error);
    return null;
  }
}

export async function getAITokens(provider?: string): Promise<AIToken[]> {
  try {
    let query = supabase
      .from('ai_tokens')
      .select('id, name, provider, created_at, is_active');
    
    if (provider) {
      query = query.eq('provider', provider);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data ? data.map(token => ({
      id: token.id,
      name: token.name,
      provider: token.provider,
      createdAt: token.created_at,
      isActive: token.is_active
    })) : [];
  } catch (error) {
    console.error('Error fetching AI tokens:', error);
    return [];
  }
}

export async function getAIToken(id: string): Promise<{ token: string } | null> {
  try {
    const { data, error } = await supabase
      .from('ai_tokens')
      .select('token')
      .eq('id', id)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    
    return data ? { token: data.token } : null;
  } catch (error) {
    console.error('Error fetching AI token:', error);
    return null;
  }
}

export async function deleteAIToken(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('ai_tokens')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting AI token:', error);
    return false;
  }
}

export async function updateAITokenStatus(id: string, isActive: boolean): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('ai_tokens')
      .update({ is_active: isActive, updated_at: new Date() })
      .eq('id', id);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating AI token status:', error);
    return false;
  }
}
