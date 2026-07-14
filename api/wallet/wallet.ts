import authApi from '..';
import {
  fetchAllDepositsPayload,
  updateAirtimeRatePayload,
  updateExchangeRatePayload,
  updateProcessingFeePayload,
} from './types';
import { clearKey, setKey } from '@/lib/store/slices/idempotency-slice';
import { store } from '@/lib/store/store';
import { IDEMPOTENCY_HEADER, resolveIdempotencyEntry } from '@/lib/idempotency';
// import { UpdateExchangeRatePayload } from './types';

const WALLET_ACTIONS = {
  updateExchangeRate: 'wallet_update_exchange_rate',
  updateProcessingFee: 'wallet_update_processing_fee',
  updateAirtimeRate: 'wallet_update_airtime_rate',
};

const resolveWalletActionKey = async (
  action: string,
  snapshot: Record<string, unknown>,
  explicitIdempotencyKey?: string,
) => {
  if (explicitIdempotencyKey) return explicitIdempotencyKey;

  const existingEntry = store.getState().idempotency.keys[action];
  const resolved = await resolveIdempotencyEntry(existingEntry, snapshot);

  if (!resolved.isReused) {
    store.dispatch(
      setKey({
        action,
        key: resolved.key,
        payloadHash: resolved.payloadHash,
      }),
    );
  }

  return resolved.key;
};

export async function updateExchangeRateFn({
  id,
  buy_rate,
  sell_rate,
  idempotencyKey,
}: updateExchangeRatePayload & { idempotencyKey?: string }) {
  try {
    const action = WALLET_ACTIONS.updateExchangeRate;
    const actionKey = await resolveWalletActionKey(
      action,
      {
        id,
        buy_pair: 'usdtngn',
        sell_pair: 'ngnusdt',
        buy_rate,
        sell_rate,
      },
      idempotencyKey,
    );

    const body = { buy_rate, sell_rate };
    const response = await authApi.put(
      `admin/${id}/exchange-rate?buy_pair=usdtngn&sell_pair=ngnusdt`,
      body,
      {
        headers: {
          [IDEMPOTENCY_HEADER]: actionKey,
        },
      },
    );

    store.dispatch(clearKey(action));
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchAllDepositsFn({
  id,
  page,
}: fetchAllDepositsPayload) {
  try {
    const response = await authApi.get(
      `/admin/${id}/users/deposits?page=${page}&page_size='10'`
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchAllWithdrawalsFn({
  id,
  page,
  page_size,
}: fetchAllDepositsPayload) {
  try {
    const response = await authApi.get(
      `/admin/${id}/users/withdrawals?page=${page}&page_size=${page_size}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchProcessingFeeFn(id: string) {
  try {
    const response = await authApi.get(`/markets/processing-fee`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function updateProcessingFeeFn({
  id,
  fee,
  idempotencyKey,
}: updateProcessingFeePayload & { idempotencyKey?: string }) {
  try {
    const action = WALLET_ACTIONS.updateProcessingFee;
    const actionKey = await resolveWalletActionKey(
      action,
      {
        id,
        fee,
      },
      idempotencyKey,
    );

    const body = { fee };
    const response = await authApi.put(`/admin/${id}/processing-fee`, body, {
      headers: {
        [IDEMPOTENCY_HEADER]: actionKey,
      },
    });

    store.dispatch(clearKey(action));
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}


export async function fetchAllUsersDepositCountFn(id: string) {
  try {
    const response = await authApi.get(`/admin/${id}/deposits/count`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function fetchAirtimeRate(id: string) {
  try {
    const response = await authApi.get(`/markets/airtime-rate`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function updateAirtimeRateFn({
  id,
  rate,
  idempotencyKey,
}: updateAirtimeRatePayload) {
  try {
    const action = WALLET_ACTIONS.updateAirtimeRate;
    const actionKey = await resolveWalletActionKey(
      action,
      {
        id,
        rate,
      },
      idempotencyKey,
    );

    const body = { rate };
    const response = await authApi.put(`/admin/${id}/airtime-rate`, body, {
      headers: {
        [IDEMPOTENCY_HEADER]: actionKey,
      },
    });

    store.dispatch(clearKey(action));
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}