import authApi from "..";
import { FetchFiatDepositPayload, UpdateFiatDepositPayload, UpdateFiatWithdrawalPayload } from "./types";

export async function fetchFiatDepositsFn({
  id,
  page_start = 1,
  page_end = 10,
}: FetchFiatDepositPayload) {
  try {
    const response = await authApi.get(
      `/admin/${id}/users/deposits?page=${page_start}&page_size=${page_end}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchFiatWithdrawalFn({
  id,
  page_start = 1,
  page_end = 10,
}: FetchFiatDepositPayload) {
  try {
    const response = await authApi.get(
      `/admin/${id}/users/withdrawals?page=${page_start}&page_size=${page_end}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function updateFiatDepositStatusFn({
  id,
  uid,
  deposit_id,
  paid,
  status,
}: UpdateFiatDepositPayload) {
  try {
    const response = await authApi.put(
      `/admin/${id}/users/${uid}/deposits/${deposit_id}?paid=${paid}&status=${status}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function updateFiatWithdrawalStatusFn({
  id,
  uid,
  withdrawal_id,
  paid,
  status,
}: UpdateFiatWithdrawalPayload) {
  try {
    const response = await authApi.put(
      `/admin/${id}/users/${uid}/withdrawals/${withdrawal_id}?paid=${paid}&status=${status}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}
