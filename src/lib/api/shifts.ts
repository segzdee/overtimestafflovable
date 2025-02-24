
import { supabase } from '../supabase/client';
import { ApiResponse, ShiftCreate } from './types';

export const shiftsApi = {
  list: async (): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('shifts')
      .select('*');
    
    if (error) return { error: error.message, status: 400 };
    return { data, status: 200 };
  },

  get: async (id: string): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('shifts')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    if (!data) return { error: 'Shift not found', status: 404 };
    return { data, status: 200 };
  },

  create: async (shift: ShiftCreate): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('shifts')
      .insert(shift)
      .select()
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    return { data, status: 201 };
  },

  update: async (id: string, updates: Partial<ShiftCreate>): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('shifts')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    if (!data) return { error: 'Shift not found', status: 404 };
    return { data, status: 200 };
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const { error } = await supabase
      .from('shifts')
      .delete()
      .eq('id', id);
    
    if (error) return { error: error.message, status: 400 };
    return { status: 204 };
  }
};
