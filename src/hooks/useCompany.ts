
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { Company } from '@/lib/types/entities';
import { useToast } from '@/components/ui/use-toast';

export function useCompany(companyId?: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: company, isLoading, error } = useQuery({
    queryKey: ['company', companyId],
    queryFn: async () => {
      if (!companyId) return null;
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .single();

      if (error) throw error;
      return data as Company;
    },
    enabled: !!companyId
  });

  const updateCompany = useMutation({
    mutationFn: async (updates: Partial<Company>) => {
      const { data, error } = await supabase
        .from('companies')
        .update(updates)
        .eq('id', companyId!)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company', companyId] });
      toast({
        title: 'Company Updated',
        description: 'Company information has been successfully updated.'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update company information.',
        variant: 'destructive'
      });
    }
  });

  return {
    company,
    isLoading,
    error,
    updateCompany
  };
}
