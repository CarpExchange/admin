import authApi from "..";
import { FetchBannersPayload } from "./types";


export async function fetchAppVersionFn({
  id,
}: {
  id: string;
}) {
  try {
    const response = await authApi.get(`/admin/${id}/app-version`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function updateAppVersionFn({
  id,
  new_version,
  message,
  action,
  m_a_v,
}: {
  id: string;
  new_version: string;
  message: string;
  action: string;
  m_a_v: string;
}) {
  try {
    const response = await authApi.put(`/admin/${id}/app-version`, { 
      new_version,
      message,
      action,
      m_a_v,
     });
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function updateMinimumDeposit({
  id,
  denom,
  amount,
}: {
  id: string;
  denom: string;
  amount: string | number;
}) {
  try {
    const response = await authApi.put(`/admin/${id}/minimum-deposit`, { 
        denom,
        amount,
     });
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchMinimumDepositsFn(id: string) {
  try {
    const response = await authApi.get(`/admin/${id}/minimum-deposits`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}



export async function fetchBannersFn({
  id,
  from,
  // to,
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
