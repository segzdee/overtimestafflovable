
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { Agency } from '@/lib/types/entities';
import { useToast } from '@/components/ui/use-toast';

export function useAgency(agencyId?: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: agency, isLoading, error } = useQuery({
    queryKey: ['agency', agencyId],
    queryFn: async () => {
      if (!agencyId) return null;
      const { data, error } = await supabase
        .from('agencies')
        .select('*')
        .eq('id', agencyId)
        .single();

      if (error) throw error;
      return data as Agency;
    },
    enabled: !!agencyId
  });

  const updateAgency = useMutation({
    mutationFn: async (updates: Partial<Agency>) => {
      const { data, error } = await supabase
        .from('agencies')
        .update(updates)
        .eq('id', agencyId!)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agency', agencyId] });
      toast({
        title: 'Agency Updated',
        description: 'Agency information has been successfully updated.'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update agency information.',
        variant: 'destructive'
      });
    }
  });

  return {
    agency,
    isLoading,
    error,
    updateAgency
  };
}
