import { useFetchRecentFiatWithdrawalsQuery } from "@/hooks/queries/useFetchRecentWithdraw";
import moment from "moment";
import Link from "next/link";

const Recent = () => {
  const { data, isPending, isSuccess, isError } =
    useFetchRecentFiatWithdrawalsQuery({}) as {
      data?: {
        recentFiatWithdrawals: {
          id: string;
          amount: number;
          CreatedAt: string;
          status: "accepted" | "processing" | "rejected";
        }[];
      };
      isPending: boolean;
      isSuccess: boolean;
      isError: boolean;
    };

  const recentFiatWithdrawals = data?.recentFiatWithdrawals ?? [];

  const StatusBadge = ({ status }: { status: string }) => {
    const base =
      "px-3 py-1 text-xs font-medium rounded-full capitalize";

    const variants: Record<string, string> = {
      accepted: "bg-green-50 text-green-600",
      processing: "bg-yellow-50 text-yellow-600",
      rejected: "bg-red-50 text-red-600",
    };

    return (
      <span className={`${base} ${variants[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Recent Withdrawals
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Latest fiat withdrawal activity
          </p>
        </div>

        <Link
          href="/fiat-withdrawals"
          className="text-sm text-gray-600 hover:text-black transition"
        >
          View all →
        </Link>
      </div>

      {/* Loading State */}
      {isPending && (
        <div className="space-y-4">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse flex justify-between items-center"
            >
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-100 rounded" />
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
          Failed to load recent withdrawals.
        </div>
      )}

      {/* Data */}
      {isSuccess && recentFiatWithdrawals.length > 0 && (
        <div className="divide-y divide-gray-100">
          {recentFiatWithdrawals.map((withdrawal) => (
            <div
              key={withdrawal.id}
              className="py-4 flex justify-between items-center hover:bg-gray-50 transition rounded-lg px-2"
            >
              {/* Left */}
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {Number(withdrawal.amount).toLocaleString()} USDT
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {moment(withdrawal.CreatedAt).format(
                    "DD MMM YYYY • hh:mm A"
                  )}
                </p>
              </div>

              {/* Right */}
              <StatusBadge status={withdrawal.status} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {isSuccess && recentFiatWithdrawals.length === 0 && (
        <div className="text-center py-10 text-sm text-gray-500">
          No recent withdrawals available.
        </div>
      )}
    </div>
  );
};

export default Recent;