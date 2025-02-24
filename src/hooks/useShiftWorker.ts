
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { ShiftWorker, WorkerCertification, WorkerLanguage, PortfolioItem } from '@/lib/types/entities';
import { useToast } from '@/components/ui/use-toast';

export function useShiftWorker(workerId?: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: worker, isLoading, error } = useQuery({
    queryKey: ['worker', workerId],
    queryFn: async () => {
      if (!workerId) return null;
      const { data, error } = await supabase
        .from('shift_workers')
        .select('*')
        .eq('id', workerId)
        .single();

      if (error) throw error;
      return data as ShiftWorker;
    },
    enabled: !!workerId
  });

  const { data: certifications } = useQuery({
    queryKey: ['worker-certifications', workerId],
    queryFn: async () => {
      if (!workerId) return [];
      const { data, error } = await supabase
        .from('shift_worker_certifications')
        .select('*')
        .eq('worker_id', workerId);

      if (error) throw error;
      return data as WorkerCertification[];
    },
    enabled: !!workerId
  });

  const { data: languages } = useQuery({
    queryKey: ['worker-languages', workerId],
    queryFn: async () => {
      if (!workerId) return [];
      const { data, error } = await supabase
        .from('shift_worker_languages')
        .select('*')
        .eq('worker_id', workerId);

      if (error) throw error;
      return data as WorkerLanguage[];
    },
    enabled: !!workerId
  });

  const { data: portfolio } = useQuery({
    queryKey: ['worker-portfolio', workerId],
    queryFn: async () => {
      if (!workerId) return [];
      const { data, error } = await supabase
        .from('shift_worker_portfolio')
        .select('*')
        .eq('worker_id', workerId);

      if (error) throw error;
      return data as PortfolioItem[];
    },
    enabled: !!workerId
  });

  const updateWorker = useMutation({
    mutationFn: async (updates: Partial<ShiftWorker>) => {
      const { data, error } = await supabase
        .from('shift_workers')
        .update(updates)
        .eq('id', workerId!)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker', workerId] });
      toast({
        title: 'Profile Updated',
        description: 'Worker profile has been successfully updated.'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update worker profile.',
        variant: 'destructive'
      });
    }
  });

  return {
    worker,
    certifications,
    languages,
    portfolio,
    isLoading,
    error,
    updateWorker
  };
}
