

export type updateExchangeRatePayload = {
  id: string;
  sell_rate: number;
  buy_rate: number;
  idempotencyKey?: string;
}

export type fetchAllDepositsPayload = {
  id: string;
  page: number;
  page_size: number;
}

export type updateProcessingFeePayload = {
  id: string;
  fee: number;
  idempotencyKey?: string;
}

export type updateAirtimeRatePayload = {
  id: string;
  rate: number;
  idempotencyKey?: string;
}