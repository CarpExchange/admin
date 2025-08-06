'use client'

import React, { useState, useContext } from 'react';
import { AuthContext } from '@/components/AuthProvider';
import { useUpdateAppVersion } from '@/hooks/mutations/useUpdateAppVersion';
import { toast } from '@/hooks/use-toast';

// interface Props {
//   onClose: () => void;
// }

export default function UpdateVersionForm() {
  const {
    state: { user_info },
  } = useContext(AuthContext);

  const [newVersion, setNewVersion] = useState('');
  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');
  const [minAppVersion, setMinAppVersion] = useState('');

  const { mutate, isPending } = useUpdateAppVersion(() => {
    toast({
      title: 'App Version Updated',
      description: 'The app version has been successfully updated.',
      variant: 'success',
    });
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user_info?.uid) return;

    mutate({
      id: user_info.uid,
      new_version: newVersion,
      message,
      action,
      m_a_v: minAppVersion,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold text-[#003399]">Update App Version</h2>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">
          New Version
        </label>
        <input
          value={newVersion}
          onChange={(e) => setNewVersion(e.target.value)}
          placeholder="e.g. 1.2.3"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to display to users"
          rows={3}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">
          Action
        </label>
        <input
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="e.g. https://appstore.link/update"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#003399] mb-1">
          Minimum App Version
        </label>
        <input
          value={minAppVersion}
          onChange={(e) => setMinAppVersion(e.target.value)}
          placeholder="e.g. 1.0.0"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399]"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#003399] text-white py-3 rounded-lg font-medium hover:bg-[#002080] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Saving...' : 'Update Version'}
      </button>
    </form>
  );
}
