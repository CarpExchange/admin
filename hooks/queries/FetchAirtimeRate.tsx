import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAirtimeRate } from '@/api/wallet';

export function useAirtimeRate(id: string) {
  const queryClient = useQueryClient();

  const { data: airtimeRate } = useQuery({
    queryKey: ['airtimeRate', id],
    queryFn: () => fetchAirtimeRate(id),
  });

  const refetchAirtimeRate = () => {
    // invalidate and refetch data
    queryClient.invalidateQueries({ queryKey: ['airtimeRate', id] });
  };

  return { airtimeRate, refetchAirtimeRate };
}
