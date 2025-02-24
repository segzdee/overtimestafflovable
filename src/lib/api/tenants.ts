
import { supabase } from '../supabase/client';
import { ApiResponse, TenantCreate } from './types';

export const tenantsApi = {
  list: async (): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('tenants')
      .select('*');
    
    if (error) return { error: error.message, status: 400 };
    return { data, status: 200 };
  },

  get: async (id: string): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    if (!data) return { error: 'Tenant not found', status: 404 };
    return { data, status: 200 };
  },

  create: async (tenant: TenantCreate): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('tenants')
      .insert(tenant)
      .select()
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    return { data, status: 201 };
  },

  update: async (id: string, updates: Partial<TenantCreate>): Promise<ApiResponse> => {
    const { data, error } = await supabase
      .from('tenants')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) return { error: error.message, status: 400 };
    if (!data) return { error: 'Tenant not found', status: 404 };
    return { data, status: 200 };
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const { error } = await supabase
      .from('tenants')
      .delete()
      .eq('id', id);
    
    if (error) return { error: error.message, status: 400 };
    return { status: 204 };
  }
};
