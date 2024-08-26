

export type UpdateExchangeRatePayload = {
  id: string;
  sell_rate: number;
  buy_rate: number;
}

export type fetchAllDepositsPayload = {
  id: string;
  page: number;
  page_size: number;
}