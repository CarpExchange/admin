import authApi from '..';
import { FetchAdminPermissionPayload } from './types';

export async function fetchAdminPermissionFn({
  id,
}: FetchAdminPermissionPayload) {
  try {
    const response = await authApi.get(
      `/admin/${id}/permissions`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response;
  }
}