'use client';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { withFetchFiatWithdrawalQuery } from '@/hooks/queries/useFetchWithdrawalQuery';
import React from 'react';

const FiatWithdrawals = ({ fiatWithdrawals }: any) => {
  console.log(fiatWithdrawals, 'fiatWithdrawals');
  return <div>FiatWithdrawals</div>;
};

export default withFetchFiatWithdrawalQuery(FiatWithdrawals, {
  components: { ServiceError: ServiceError, Loading: Spinner },
});
