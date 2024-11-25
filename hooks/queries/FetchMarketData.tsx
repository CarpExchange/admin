import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAMarket } from '@/api/market';

export function useMarketData(pair: string) {
  const queryClient = useQueryClient();
  // const queryKey = ['market'];

  const { data: marketData } = useQuery({
    queryKey: ['market'],
    queryFn: () => fetchAMarket(pair),
  });

  const refetchMarketData = () => {
    // invalidate and refetch data
    queryClient.invalidateQueries({ queryKey: ['market'] });
  };

  return { marketData, refetchMarketData };
}
