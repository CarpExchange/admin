import useFetchFiatWithdrawalsQuery from '@/hooks/queries/useFetchWithdrawalQuery'
import moment from 'moment';
import React, { useState } from 'react'
import { useFetchRecentFiatWithdrawalsQuery } from '@/hooks/queries/useFetchRecentWithdraw';
import Link from 'next/link';


// const statusIcon = {
//   accepted: '✅',
//   processing: '⏳',
//   rejected: '❌',
// };

const Recent = () => {

  // const [page] = useState<number>(1);

  const { data, isPending, isSuccess, isError } = useFetchRecentFiatWithdrawalsQuery({
    
  }) as {
    data?: {
      recentFiatWithdrawals: {
        id: string;
        amount: number;
        CreatedAt: string;
        status: 'accepted' | 'processing' | 'rejected';
      }[];
      refetch: () => void;
    };
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
  

  const { recentFiatWithdrawals = [], refetch } = data || {};

  return (
    <div className="p-4 bg-white rounded-xl border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Recent Transactions</h2>
        <Link href="/fiat-withdrawals" className="text-sm text-blue-600 hover:underline">
          View all
        </Link>
      </div>

      {isPending && (
        <div className="space-y-3">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-muted rounded-lg p-4 border border-muted-foreground"
            >
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-sm">Error loading transactions.</p>
      )}

      {isSuccess ? (
        <div className="space-y-3">
          {recentFiatWithdrawals?.map((withdrawal: any) => (
            <div
              key={withdrawal.id}
              className="rounded-lg md:border border-none md:border-border bg-white p-1 md:p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-foreground">
                   {Number(withdrawal.amount).toLocaleString()} USDT 
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {moment(withdrawal?.CreatedAt).format('DD MMM, YYYY • hh:mm a')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      text-sm font-medium capitalize
                      ${withdrawal.status === 'accepted' ? 'text-green-600'
                        : withdrawal.status === 'processing' ? 'text-yellow-500'
                        : 'text-red-500'}
                    `}
                  >
                     {withdrawal.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isPending && <p className="text-muted-foreground text-sm">No recent transactions available.</p>
      )}
    </div>
  )
}

export default Recent
