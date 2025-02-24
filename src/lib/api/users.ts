
import { supabase } from '../supabase/client';
import { ApiResponse, UserCreate } from './types';

export const usersApi = {
  list: async (): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) return { error: error.message, status: 400 };
    return { data, status: 200 };
  },

  get: async (id: string): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    if (!data) return { error: 'User not found', status: 404 };
    return { data, status: 200 };
  },

  create: async (user: UserCreate): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    return { data, status: 201 };
  },

  update: async (id: string, updates: Partial<UserCreate>): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    if (!data) return { error: 'User not found', status: 404 };
    return { data, status: 200 };
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) return { error: error.message, status: 400 };
    return { status: 204 };
  }
};
