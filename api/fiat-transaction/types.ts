
export type UpdateAdminAccountDetailPayload = {
  id: string;
  account_name: string;
  account_number: string;
  bank_name: string;
}

export type FetchFiatDepositPayload = {
  id: string;
  page: number;
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