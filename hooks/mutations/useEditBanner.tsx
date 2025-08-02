import { useMutation } from '@tanstack/react-query';
import { editBannerFn } from '@/api/banners';

export function useEditBanner(onSuccess?: () => void, onError?: (error: any) => void) {
  return useMutation({
    mutationFn: editBannerFn,
    onSuccess,
    onError,
  });
}
