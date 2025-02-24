
import { supabase } from '../supabase/client';
import { ApiResponse, ApplicationCreate } from './types';

export const applicationsApi = {
  list: async (): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('shift_applications')
      .select('*');
    
    if (error) return { error: error.message, status: 400 };
    return { data, status: 200 };
  },

  get: async (id: string): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('shift_applications')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    if (!data) return { error: 'Application not found', status: 404 };
    return { data, status: 200 };
  },

  create: async (application: ApplicationCreate): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('shift_applications')
      .insert(application)
      .select()
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    return { data, status: 201 };
  },

  update: async (id: string, updates: Partial<ApplicationCreate>): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('shift_applications')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    if (!data) return { error: 'Application not found', status: 404 };
    return { data, status: 200 };
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const { error } = await supabase
      .from('shift_applications')
      .delete()
      .eq('id', id);
    
    if (error) return { error: error.message, status: 400 };
    return { status: 204 };
  }
};
