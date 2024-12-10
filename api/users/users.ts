import authApi from "..";
import {
  DeleteUserPayload,
  GetUserDetailsPayload,
  LoginPayload,
  UpdateVerificationStatusPayload,
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
  // console.log(id, "id");
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
    const response = await authApi.get(`/admin/${uid}/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}


export async function updateUserVerficationStatusFn({id, email, verification_type}: UpdateVerificationStatusPayload) {
  try {
    const response = await authApi.put(`/admin/${id}/user/${email}/verify?verification_type=${verification_type}&status=true`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}