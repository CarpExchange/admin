'use client';

import React, { useState } from "react";
import { Search, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import FiatWithdrawalTable from "./FiatWithdrawalTable";
import useFetchDepositsCount from "@/hooks/queries/useFetchTotalDepositCount";
import useFetchWithdrawalsCount from "@/hooks/queries/useFetchTotalWithdrawalCount";
import Icon from "@/public/assets/svgs/icon";

const FiatWithdrawals = () => {
  const { depositscount } = useFetchDepositsCount();
  const totalDeposits = depositscount?.totalCount ?? 0;

  const { withdrawalsCount } = useFetchWithdrawalsCount();
  const totalWithdrawals = withdrawalsCount?.totalCount ?? 0;

  const [query, setQuery] = useState("");

  return (
    <div className="w-full px-4 md:px-8 py-6 md:py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-secondary">
          Fiat Withdrawals
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Track and manage crypto withdrawals converted to NGN.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

        {/* Total Deposits */}
        <div className="bg-white border rounded-xl p-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Deposits</p>
            <p className="text-xl font-semibold mt-1">
              {totalDeposits}
            </p>
          </div>
          <Icon />
        </div>

        {/* Total Withdrawals */}
        <div className="bg-white border rounded-xl p-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Withdrawals</p>
            <p className="text-xl font-semibold mt-1">
              {totalWithdrawals}
            </p>
          </div>
          <Icon />
        </div>

        {/* Total Volume */}
        <div className="bg-white border rounded-xl p-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Volume</p>
            <p className="text-xl font-semibold mt-1">200</p>
            <p className="text-xs text-green-500">+10% this month</p>
          </div>
          <Icon />
        </div>

      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

        <div className="flex items-center bg-white border rounded-lg px-3 w-full md:w-[300px]">
          <Search size={20} className="text-gray-400" />

          <Input
            type="text"
            placeholder="Search withdrawal..."
            className="border-none focus-visible:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <XIcon
              size={18}
              className="cursor-pointer text-gray-400"
              onClick={() => setQuery("")}
            />
          )}
        </div>

      </div>

      {/* Table */}
      <FiatWithdrawalTable query={query} />

    </div>
  );
};

export default FiatWithdrawals;