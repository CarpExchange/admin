'use client'

import React, { useState, useContext } from 'react';
import { AuthContext } from '@/components/AuthProvider';
import { toast } from '@/hooks/use-toast';
import { useUpdateMinimumDeposit } from '@/hooks/mutations/useUpdateMinimumDeposit';

export default function UpdateMinimumDepositForm() {
  const {
    state: { user_info },
  } = useContext(AuthContext);

  const [denom, setDenom] = useState('');
  const [amount, setAmount] = useState('');

  const { mutate, isPending } = useUpdateMinimumDeposit(() => {
    toast({
      title: 'Minimum Deposit Updated',
      description: 'The minimum deposit has been successfully updated.',
      variant: 'success',
    });
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user_info?.uid) return;

    mutate({
      id: user_info.uid,
      denom,
      amount: parseFloat(amount),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold text-[#003399]">Update Minimum Deposit</h2>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">
          Denomination
        </label>
        <input
          value={denom}
          onChange={(e) => setDenom(e.target.value)}
          placeholder="e.g. usd"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">
          Amount
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 1000"
          type="number"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#003399] text-white py-3 rounded-lg font-medium hover:bg-[#002080] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Saving...' : 'Update Minimum Deposit'}
      </button>
    </form>
  );
}
