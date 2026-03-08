'use client';

import React, { useState } from "react";
import { Search, XIcon, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import FiatDepositsTable from "./FiatDepositsTable";

const FiatDeposits = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full px-4 md:px-8 py-6 md:py-10">

      {/* Page Header */}
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-secondary">
          Fiat Deposits
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Track and manage fiat deposits for USDT conversions.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        {/* Search */}
        <div className="flex items-center bg-white border rounded-lg px-3 w-full md:w-[350px]">
          <Search size={20} className="text-gray-400" />

          <Input
            type="text"
            placeholder="Search name or bank..."
            className="border-none focus-visible:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <XIcon
              size={18}
              className="cursor-pointer text-gray-400 hover:text-red-500"
              onClick={() => setQuery("")}
            />
          )}
        </div>

        {/* Filter Button */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 transition"
        >
          <ListFilter size={18} />
          <span className="text-sm font-medium">Filter</span>
        </button>

      </div>

      {/* Table Container */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <FiatDepositsTable query={query} />
      </div>

    </div>
  );
};

export default FiatDeposits;