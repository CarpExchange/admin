'use client';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import useFetchFiatWithdrawalsQuery from '@/hooks/queries/useFetchWithdrawalQuery';
import React, { useState } from 'react';
import { Search, XIcon, ListFilter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FiatWithdrawals = ({}: any) => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isSuccess, isError } = useFetchFiatWithdrawalsQuery({
    page,
  });

  const { fiatWithdrawals, refetch } = data
  console.log(fiatWithdrawals)
  const [query, setQuery] = useState('')


  return (
    <>
      {isError && <ServiceError />}
      {isPending && <Spinner />}
      {isSuccess && (
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
        </div>
      )}
    </>
  );
};


export default FiatWithdrawals

// export default withFetchFiatWithdrawalsQuery(FiatWithdrawals, {
//   components: { ServiceError: ServiceError, Loading: Spinner },
// });
