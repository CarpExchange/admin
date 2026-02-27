'use client';
import React, { useState } from 'react';
import { Search, XIcon, ListFilter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FiatDepositsTable from './FiatDepositsTable';

const FiatDeposits = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="w-full h-full py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Fiat Deposits</h1>
          <p className="text-gray-500 text-sm">
            Track and manage fiat deposits for USDT
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
          {/* Search Box */}
          <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm px-3 py-2 w-full md:max-w-md">
            <Search size={20} className="text-gray-400" />
            <Input
              type="text"
              placeholder="Search by user, email, wallet ID..."
              className="border-none ml-2 placeholder-gray-400 focus:ring-0 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query.length > 0 && (
              <XIcon
                size={20}
                className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                onClick={() => setQuery('')}
              />
            )}
          </div>

          {/* Filter Button */}
          <button
            type="button"
            className="flex items-center space-x-2 text-primary font-medium px-3 py-2 bg-white border border-primary rounded-lg shadow-sm hover:bg-primary/10 transition"
            onClick={() => {
              // Toggle filter dropdown logic here
            }}
          >
            <ListFilter size={16} className="text-primary" />
            <span className="hidden xl:inline">Filter by</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <FiatDepositsTable query={query} />
      </div>
    </div>
  );
};

export default FiatDeposits;