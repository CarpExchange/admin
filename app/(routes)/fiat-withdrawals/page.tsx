'use client';
import React, { useState } from 'react';
import { Search, XIcon, ListFilter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FiatWithdrawalTable from './FiatWithdrawalTable';

const FiatWithdrawals = ({}: any) => {
  const [query, setQuery] = useState('')

  return (
    <>
        <div className="w-full max-w-full h-full px-6 py-8">
          <div>
            <div className="space-y-0.5">
              <p className="font-semibold text-2xl">Fiat Withdrawals</p>
              <p>Track, and manage crypto withdrawal for NGN payment</p>
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
