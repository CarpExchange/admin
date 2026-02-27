"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import UsersTable from "./UsersTable";
import CustomersCount from "@/components/customersCount/customersCount";
import DownloadXls from "@/components/DownloadXls";

const Customers = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="px-2 md:px-0 py-6 md:py-10 max-w-[1400px] mx-auto space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Customers
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and monitor all registered customers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DownloadXls />
        </div>
      </div>

      {/* Stats Section */}
      <CustomersCount />

      {/* Tabs + Search */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 md:p-6">

        <Tabs defaultValue="all" className="w-full space-y-6">

          {/* Top Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* Tabs */}
            <TabsList className="bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
              <TabsTrigger
                value="all"
                className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-2"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="verified"
                className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-2"
              >
                Verified
              </TabsTrigger>
              <TabsTrigger
                value="unverified"
                className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-2"
              >
                Unverified
              </TabsTrigger>
            </TabsList>

            {/* Search */}
            <div className="relative w-full sm:w-[320px]">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                type="text"
                placeholder="Search by name, email, or phone..."
                className="pl-9 pr-9 h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <X
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700"
                  onClick={() => setQuery("")}
                />
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div>
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
  );
};

export default Customers;