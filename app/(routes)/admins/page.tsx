'use client';

import React, { useState } from 'react';
import { useAdminPermission } from '@/hooks/queries/FetchAdminPermission';


type Permission = {
  id: string;
  name: string;
};

const Page = () => {
  const adminId = '22edd8de-3481-4d9d-b697-1d411b5e2cf5';

  const { adminPermission } = useAdminPermission(adminId);

  const [search, setSearch] = useState('');

  const permissions: Permission[] = adminPermission?.data || [];

  const filteredPermissions = permissions.filter((perm) =>
    perm.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Permissions</h1>
          <p className="text-gray-500 text-sm">
            Manage what this admin can access
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search permissions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-2 w-full md:w-72 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Stats */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredPermissions.length} of {permissions.length} permissions
      </div>

      {/* Permissions Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredPermissions.map((permission) => (
          <div
            key={permission.id}
            className="p-4 rounded-2xl border bg-white shadow-sm flex items-center justify-between hover:shadow-md transition"
          >
            {/* Info */}
            <div>
              <p className="font-medium text-gray-800 capitalize">
                {permission.name.replace('_', ' ')}
              </p>
              <p className="text-xs text-gray-400">{permission.id}</p>
            </div>

            {/* Toggle Switch */}
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative transition">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPermissions.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No permissions found.
        </div>
      )}
    </div>
  );
};

export default Page;