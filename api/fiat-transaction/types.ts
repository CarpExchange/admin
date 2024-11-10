

export type FetchFiatDepositPayload = {
  id: string;
  page_start?: number;
  page_end?: number
}

export type UpdateFiatDepositPayload = {
  id: string;
  uid: string;
  deposit_id: string;
  paid: boolean;
  status: 'processing' | 'accepted' | 'rejected'
}

export type UpdateFiatWithdrawalPayload = {
  id: string;
  uid: string;
  withdrawal_id: string;
  paid: boolean;
  status: 'processing' | 'accepted' | 'rejected'
}