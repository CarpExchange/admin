import { fetchAdminPermissionFn } from '@/api/admins';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useAdminPermission(id: string) {
  const queryClient = useQueryClient();

  const {
    data: adminPermission,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['adminPermission', id],
    queryFn: () => fetchAdminPermissionFn({ id }),
    enabled: !!id, // prevents running when id is undefined/null/empty
  });

  const refetchAdminPermission = () => {
    queryClient.invalidateQueries({
      queryKey: ['adminPermission', id],
    });
  };

  return {
    adminPermission,
    isLoading,
    isError,
    error,
    refetchAdminPermission,
  };
}