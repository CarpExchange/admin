"use client"
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, ListFilter, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import UsersTable from './UsersTable';
import useFetchCustomersQuery from '@/hooks/queries/useFetchCustomers';



const Customers = () => {

  const { data } = useFetchCustomersQuery();

  const length = data?.allCustomers?.length || 0;

  const { bvnverifiedCount, ninverifiedCount } = data?.allCustomers?.reduce(
    (counts: { bvnverifiedCount: number; ninverifiedCount: number }, customer: { bvn_is_verified: boolean; nin_is_verified: boolean }) => {
      if (customer.bvn_is_verified) counts.bvnverifiedCount++;
      if (customer.nin_is_verified) counts.ninverifiedCount++;
      return counts;
    },
    { bvnverifiedCount: 0, ninverifiedCount: 0 }
  ) || { bvnverifiedCount: 0, ninverifiedCount: 0 };

  const verifiedCount = bvnverifiedCount + ninverifiedCount;

  const unverifiedCount = length - verifiedCount;
  // console.log(unverifiedCount)


  const [query, setQuery] = useState<string>('');

  return (
    <div className="p-2 md:py-[48px]">
      <div className="flex flex-col gap-[28px]">
        <div className="flex flex-col gap-1 font-figtree text-secondary">
          <h2 className="font-semibold text-2xl ">Customers</h2>
          <p className="text-secondary">Manage all customers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Customers */}
          <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Customers</h3>
            <p className="text-3xl font-extrabold text-gray-800">{length}</p>
          </div>

          {/* Verified Customers */}
          <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-sm font-medium text-green-600 mb-1">Verified Customers</h3>
            <p className="text-3xl font-extrabold text-gray-800">{verifiedCount}</p>
          </div>

          {/* Unverified Customers */}
          <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-sm font-medium text-red-500 mb-1">Unverified Customers</h3>
            <p className="text-3xl font-extrabold text-gray-800">{unverifiedCount}</p>
          </div>
        </div>


        <div>
          <Tabs defaultValue="all" className="mt-5 w-full">
            <div className="flex flex-wrap items-center justify-between space-y-3 sm:space-y-0 sm:space-x-5 overflow-x-auto">
              <TabsList className="flex-shrink-0">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="unverified">Unverified</TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="flex bg-white items-center border border-[#4C52594D] rounded-md px-2 w-full sm:w-auto">
            <Search size={24} />
            <Input
              type="text"
              placeholder="Search..."
              className="border-none min-w-[150px] sm:min-w-[200px] flex-grow"
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
              </div>
            </div>
            <div className="p-1 pb-10 mt-5">
              <TabsContent value="all">
          <UsersTable query={query} statusType="all" />
              </TabsContent>
              <TabsContent value="verified">
          <UsersTable query={query} statusType="verified" />
              </TabsContent>
              <TabsContent value="unverified">
          <UsersTable query={query} statusType="unverified" />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Customers