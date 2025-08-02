import authApi from "..";
import { FetchBannersPayload } from "./types";

/**
 * Fetches in-app banners for a given user ID and date range.
 * Dates should be provided as Date objects or ISO strings.
 */
export async function fetchBannersFn({
  id,
  from,
  to,
}: FetchBannersPayload) {
  try {
    // Ensure from and to are properly formatted ISO strings in UTC
    const fromISO = new Date(from).toISOString(); // e.g. 2025-07-14T00:00:00.000Z
    const toISO = new Date().toISOString();

    const response = await authApi.get(
      `/admin/${id}/banners/in-app?from=${fromISO}&to=${toISO}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function editBannerFn({
  id,
  bannerId,
  title,
  content,
  image_url,
  action_url,
  is_active,
}: {
  id: string;
  bannerId: string;
  title: string;
  content: string;
  image_url: string;
  action_url: string;
  is_active: boolean;
}) {
  try {
    const response = await authApi.put(`/admin/${id}/banners/in-app/${bannerId}`, {
      title,
      content,
      image_url,
      action_url,
      is_active,
    });
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}


export async function createBannerFn({
  id,
  title,
  content,
  image_url,
  action_url,
  is_active,
}: {
  id: string;
  title: string;
  content: string;
  image_url: string;
  action_url: string;
  is_active: boolean;
}) {
  try {
    const response = await authApi.post(`/admin/${id}/banners/in-app/create`, {
      title,
      content,
      image_url,
      action_url,
      is_active,
    });
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}
