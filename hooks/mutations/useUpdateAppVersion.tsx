import { useMutation } from '@tanstack/react-query';
import { updateAppVersionFn } from '@/api/banners';

export function useUpdateAppVersion(onSuccess?: () => void, onError?: (error: any) => void) {
  return useMutation({
    mutationFn: updateAppVersionFn,
    onSuccess,
    onError,
  });
}
