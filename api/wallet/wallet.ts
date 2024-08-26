import authApi from "..";
import { fetchAllDepositsPayload, UpdateExchangeRatePayload } from "./types";

export async function updateExchangeRateFn ({id, buy_rate, sell_rate}: UpdateExchangeRatePayload) {
  try {  
    const body = { buy_rate, sell_rate }
    const response = await authApi.put(`admin/${id}/exchange-rate`, body);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchAllDepositsFn ({id, page, page_size}: fetchAllDepositsPayload ) {
  try {  
    const response = await authApi.get(`/admin/${id}/users/deposits?page=${page}&page_size=${page_size}`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchAllWithdrawalsFn ({id, page, page_size}: fetchAllDepositsPayload ) {
  try {  
    const response = await authApi.get(`/admin/${id}/users/withdrawals?page=${page}&page_size=${page_size}`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}