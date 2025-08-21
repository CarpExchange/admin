'use client';

import React from 'react';
import UpdateMinimumDepositForm from './updateMinimumDeposit';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MinimumDeposits from '@/components/minimumDeposits/MinimumDeposits';

const Page = () => {

  
  return (
    <div className="p-6 md:p-6">
      {/* Go Back */}
      <Link href="/settings" className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-[#E6EEFF] flex items-center justify-center">
          <ArrowLeft size={20} color="#003399" />
        </div>
        <span className="text-[#003399] font-semibold">Back to Settings</span>
      </Link>

      <h1 className="text-2xl font-bold mb-4">Minimum Deposit Settings</h1>

      {/* Current Minimum Deposits */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Minimum Deposits</h2>

       <MinimumDeposits/>
      </div>

      {/* Update Minimum Deposit Form */}
      <UpdateMinimumDepositForm />
    </div>
  );
};

export default Page;
