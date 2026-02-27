import useFetchMinimumDepositsQuery from "@/hooks/queries/useFetchMinimumDeposit";

const MinimumDeposits = () => {
  const { data, isLoading, isError } = useFetchMinimumDepositsQuery();

  const minimumDeposits = data?.allMinimumDeposit ?? [];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">
          Minimum Deposit Requirements
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Required minimum deposit amount per supported currency.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between animate-pulse">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
          Failed to load minimum deposit data.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && minimumDeposits.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <th className="pb-3">Currency</th>
                <th className="pb-3 text-right">Minimum Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {minimumDeposits.map((deposit: any, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="py-3 font-medium text-gray-900">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
                      {deposit.denom.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right font-semibold text-gray-800">
                    {Number(deposit.amount).toFixed(6)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && minimumDeposits.length === 0 && (
        <div className="text-center py-10 text-sm text-gray-500">
          No minimum deposit requirements configured.
        </div>
      )}
    </div>
  );
};

export default MinimumDeposits;