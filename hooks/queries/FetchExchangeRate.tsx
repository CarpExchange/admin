import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchExchangeRate } from '@/api/market';


const refetchInterval = 5000;

export function useExchangeRateData() {
  const queryClient = useQueryClient();

  const { data: exchangeRateData } = useQuery({
    queryKey: ['exchangeRate'],
    queryFn: () => fetchExchangeRate(),
    refetchInterval,
  });

  const refetchExchnageRateData = () => {
    // invalidate and refetch data
    queryClient.invalidateQueries({ queryKey: ['exchangeRate'] });
  };

  return { exchangeRateData, refetchExchnageRateData };
}
