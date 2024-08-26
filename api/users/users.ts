import authApi from "..";
import {
  DeleteUserPayload,
  GetUserDetailsPayload,
  LoginPayload,
} from "./types";

export async function loginFn({ email, password }: LoginPayload) {
  try {
    const body = { email, password };
    const response = await authApi.post("/auth/admin/login", body);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function logOutFn(id: string) {
  try {
    const response = await authApi.post(`/admin/${id}/logout`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchAllUsersFn(id: string) {
  try {
    const response = await authApi.get(`/admin/${id}/users`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function deleteUserFn({ id, uid }: DeleteUserPayload) {
  try {
    const response = await authApi.delete(`/admin/${id}/users/${uid}`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchAUserDetailsFn({ id, uid }: GetUserDetailsPayload) {
  try {
    const response = await authApi.get(`/admin/${id}/users/${uid}`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}
