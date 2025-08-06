'use client'

import React from 'react'
import UpdateMinimumDepositForm from './updateMinimumDeposit'
import useFetchMinimumDeposits from '@/hooks/queries/useFetchMinimumDeposit'

const Page = () => {

    const { minimumDeposits } = useFetchMinimumDeposits();

    const minimumDepositsData = minimumDeposits?.denom

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Minimum Deposit Settings</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Current Minimum Deposits</h2>
       <p>{minimumDepositsData > 0 ? minimumDepositsData : 0}</p>
      </div>

      <UpdateMinimumDepositForm />
    </div>
  );
};

export default Page;
