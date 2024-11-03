import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, ListFilter, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import UsersTable from './UsersTable';

const Customers = () => {
  const [query, setQuery] = useState<string>('');
  return (
    <div className="bg-gray-100 py-[48px] px-[20px]">
      <div className="flex flex-col gap-[28px]">
        <div className="flex flex-col gap-1 font-figtree text-secondary">
          <h2 className="font-semibold text-2xl ">Customers</h2>
          <p className="text-secondary">Manage all customers</p>
        </div>

        <div>
          <Tabs defaultValue="all" className="mt-5 w-full">
            <div className="flex items-center justify-between space-x-5 overflow-x-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
                <TabsTrigger value="unverified">Inverified</TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-3">
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