import useFetchCustomersQuery from '@/hooks/queries/useFetchCustomers';
import React from 'react'

const CustomersCount = () => {

     const { data } = useFetchCustomersQuery();
    //  console.log(datadata)
    
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
  return (
    <div>
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
    </div>
  )
}

export default CustomersCount
