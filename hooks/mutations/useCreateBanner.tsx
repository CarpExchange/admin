import { useMutation } from '@tanstack/react-query';
import { createBannerFn } from '@/api/banners';

export function useCreateBanner(onSuccess?: () => void, onError?: (error: any) => void) {
  return useMutation({
    mutationFn: createBannerFn,
    onSuccess,
    onError,
  });
}
