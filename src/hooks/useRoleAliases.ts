
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { RoleAlias, BaseRole } from '@/lib/types';

export function useRoleAliases() {
  const { data: roleAliases, isLoading, error } = useQuery({
    queryKey: ['roleAliases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('role_aliases')
        .select('*')
        .order('is_canonical', { ascending: false });
      
      if (error) throw error;
      return data as RoleAlias[];
    }
  });

  const getAliasesForRole = (role: BaseRole) => {
    return roleAliases?.filter(alias => alias.base_role === role) || [];
  };

  const getCanonicalAlias = (role: BaseRole) => {
    return roleAliases?.find(alias => alias.base_role === role && alias.is_canonical)?.alias || role;
  };

  const getAllCanonicalAliases = () => {
    return roleAliases?.filter(alias => alias.is_canonical) || [];
  };

  return {
    roleAliases,
    isLoading,
    error,
    getAliasesForRole,
    getCanonicalAlias,
    getAllCanonicalAliases
  };
}
