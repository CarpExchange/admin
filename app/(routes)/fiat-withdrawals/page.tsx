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
      <div className="w-full max-w-full h-full px-6 py-8">
        <div>
          <div className="space-y-0.5">
            <p className="font-semibold text-2xl">Fiat Withdrawals</p>
            <p>Track, and manage crypto withdrawal for NGN payment</p>
          </div>
          <div className="flex flex-row justify-between items-center w-full gap-4 mt-6">
            {/* Total Users */}
            <div className="border border-gray-300 w-1/3 rounded-[6px]">
              <div className="flex flex-col gap-4 p-4">
                <h2 className="font-semibold">Total Deposit</h2>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p>{totalDeposits > 0 ? totalDeposits : <span className="text-red-100">0</span>}</p>
                  </div>
                  <Icon />
                </div>

              </div>
            </div>

            {/* Total Transactions (placeholder) */}
            <div className="border border-gray-300 w-1/3 rounded-[6px]">
              <div className="flex flex-col gap-4 p-4">
                <h2 className="font-semibold">Total Withdrawals</h2>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p>{totalWithdrawals > 0 ? totalWithdrawals : <span className="text-red-100">0</span>}</p>
                    {/* <p className="text-[10px]">10% high</p> */}
                  </div>
                  <Icon />
                </div>
              </div>
            </div>

            {/* Total Volume Transacted (placeholder) */}
            <div className="border border-gray-300 w-1/3 rounded-[6px]">
              <div className="flex flex-col gap-4 p-4">
                <h2 className="font-semibold">Total Volume Transacted</h2>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p>200</p>
                    <p className="text-[10px]">10% high</p>
                  </div>
                  <Icon />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-3 mt-7">
            <div className="flex bg-white items-center border border-[#4C52594D] rounded-md px-2">
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
                />
              )}
            </div>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => {
                // @ts-ignore
                // setShowDropdown(!showDropdown);
              }}
            >
              <ListFilter color="#095AD3" size={16} />
              <p className="text-[#095AD3] xl:flex hidden">Filter by</p>
            </div>
          </div>
        </div>

        <FiatWithdrawalTable query={query} />
      </div>
    </>
  );
};


export default FiatWithdrawals
