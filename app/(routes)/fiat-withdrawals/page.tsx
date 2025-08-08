'use client';
import React, { useState } from 'react';
import { Search, XIcon, ListFilter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FiatWithdrawalTable from './FiatWithdrawalTable';
import useFetchDepositsCount from "@/hooks/queries/useFetchTotalDepositCount";
import useFetchWithdrawalsCount from "@/hooks/queries/useFetchTotalWithdrawalCount";
import Icon from "@/public/assets/svgs/icon";

const FiatWithdrawals = ({ }: any) => {

  const { depositscount } = useFetchDepositsCount();

  // totalCount is under data.totalCount
  const totalDeposits = depositscount?.totalCount ?? 0;

  const { withdrawalsCount } = useFetchWithdrawalsCount();

  // totalCount is under data.totalCount
  const totalWithdrawals = withdrawalsCount?.totalCount ?? 0;

  const [query, setQuery] = useState('')

  return (
    <>
      <div className="w-full max-w-full h-full px-4 md:px-6 py-6 md:py-8">
        <div>
          <div className="space-y-1">
            <p className="font-semibold text-xl md:text-2xl">Fiat Withdrawals</p>
            <p className="text-sm md:text-base">Track, and manage crypto withdrawal for NGN payment</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 mt-6">
            {/* Total Users */}
            <div className="border border-gray-300 w-full md:w-1/3 rounded-[6px]">
              <div className="flex flex-col gap-4 p-4">
                <h2 className="font-semibold text-sm md:text-base">Total Deposit</h2>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p className="text-lg md:text-xl">{totalDeposits > 0 ? totalDeposits : <span className="text-red-100">0</span>}</p>
                  </div>
                  <Icon />
                </div>
              </div>
            </div>

            {/* Total Transactions */}
            <div className="border border-gray-300 w-full md:w-1/3 rounded-[6px]">
              <div className="flex flex-col gap-4 p-4">
                <h2 className="font-semibold text-sm md:text-base">Total Withdrawals</h2>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p className="text-lg md:text-xl">{totalWithdrawals > 0 ? totalWithdrawals : <span className="text-red-100">0</span>}</p>
                  </div>
                  <Icon />
                </div>
              </div>
            </div>

            {/* Total Volume Transacted */}
            <div className="border border-gray-300 w-full md:w-1/3 rounded-[6px]">
              <div className="flex flex-col gap-4 p-4">
                <h2 className="font-semibold text-sm md:text-base">Total Volume Transacted</h2>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p className="text-lg md:text-xl">200</p>
                    <p className="text-[10px] md:text-xs">10% high</p>
                  </div>
                  <Icon />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-3 mt-7">
            <div className="flex bg-white items-center border border-[#4C52594D] rounded-md px-2 w-full md:w-auto">
              <Search size={24} />
              <Input
                type="text"
                placeholder="Search..."
                className="border-none min-w-[200px]"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                value={query}
              />
              {query.length > 0 && (
                <XIcon
                  onClick={() => {
                    setQuery('');
                  }}
                  className="cursor-pointer"
                />
              )}
            </div>
            <div
              className="flex items-center space-x-2 cursor-pointer w-full md:w-auto"
              onClick={() => {
                // @ts-ignore
                // setShowDropdown(!showDropdown);
              }}
            >
              <ListFilter color="#095AD3" size={16} />
              <p className="text-[#095AD3] hidden md:flex">Filter by</p>
            </div>
          </div>
        </div>

        <FiatWithdrawalTable query={query} />
      </div>
    </>
  );
};

export default FiatWithdrawals;
