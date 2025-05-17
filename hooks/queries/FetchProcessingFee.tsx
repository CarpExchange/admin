import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProcessingFeeFn } from '@/api/wallet';

export function useProcessingFee(id: string) {
  const queryClient = useQueryClient();

  const { data: processingFee } = useQuery({
    queryKey: ['processingFee', id],
    queryFn: () => fetchProcessingFeeFn(id),
  });

  const refetchProcessingFee = () => {
    // invalidate and refetch data
    queryClient.invalidateQueries({ queryKey: ['processingFee', id] });
  };

  return { processingFee, refetchProcessingFee };
}
