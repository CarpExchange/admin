'use client';
import useFetchFiatDepositsQuery from '@/hooks/queries/useFetchFiatDepositsQuery';
import React, { useState } from 'react';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { Search, XIcon, ListFilter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FiatDeposits = ({}: any) => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isSuccess, isError } = useFetchFiatDepositsQuery({
    page,
  });

  const { fiatDeposits, refetch } = data;
  console.log(fiatDeposits);

  const [query, setQuery] = useState('')
  return (
    <>
      {isError && <ServiceError />}
      {isPending && <Spinner />}
      {isSuccess && (
        <div className="w-full max-w-full h-full px-6 py-8">
          <div>
            <div className="space-y-0.5">
              <p className="font-semibold text-2xl">Fiat Deposits</p>
              <p>Track, and manage fiat deposits for USDT</p>
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
        </div>
      )}
    </>
  );
};

export default FiatDeposits;
