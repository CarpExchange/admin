import React from 'react'
import useFetchMinimumDepositsQuery from '@/hooks/queries/useFetchMinimumDeposit';

const MinimumDeposits = () => {

    const { data } = useFetchMinimumDepositsQuery();
  // console.log(data)

  const minimumDeposits = data?.allMinimumDeposit || [];
  // console.log(minimumDeposits)

  return (
    <div>
       <div className="bg-white shadow-md rounded-lg p-4">
          {minimumDeposits.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-sm md:text-base font-medium text-gray-700">Currency</th>
                    <th className="p-2 text-sm md:text-base font-medium text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {minimumDeposits.map((deposit: any, index: number) => (
                    <tr key={index} className="border-t">
                      <td className="p-2 text-sm md:text-base text-gray-800">{deposit.denom.toUpperCase()}</td>
                      <td className="p-2 text-sm md:text-base text-gray-800">{deposit.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm md:text-base text-gray-700">No minimum deposits available.</p>
          )}
        </div>
    </div>
  )
}

export default MinimumDeposits
