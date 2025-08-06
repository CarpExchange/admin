import { useMutation } from '@tanstack/react-query';
import { updateMinimumDeposit } from '@/api/banners';

export function useUpdateMinimumDeposit(onSuccess?: () => void, onError?: (error: any) => void) {
  return useMutation({
    mutationFn: updateMinimumDeposit,
    onSuccess,
    onError,
  });
}
