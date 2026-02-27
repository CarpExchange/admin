"use client";

import BannerViewer from "@/components/banners/Banners";
import CustomersCount from "@/components/customersCount/customersCount";
import MinimumDeposits from "@/components/minimumDeposits/MinimumDeposits";
import Recent from "@/components/recentTransactions/recent";
import useFetchDepositsCount from "@/hooks/queries/useFetchTotalDepositCount";
import useFetchWithdrawalsCount from "@/hooks/queries/useFetchTotalWithdrawalCount";
import Icon from "@/public/assets/svgs/icon";

export default function Home() {
  const { depositscount, isLoading: depositsLoading } = useFetchDepositsCount();
  const { withdrawalsCount, isLoading: withdrawalsLoading } =
    useFetchWithdrawalsCount();

  const totalDeposits = depositscount?.totalCount ?? 0;
  const totalWithdrawals = withdrawalsCount?.totalCount ?? 0;
  const totalCount = totalDeposits + totalWithdrawals;

  const StatCard = ({
    title,
    value,
    loading,
  }: {
    title: string;
    value: number;
    loading?: boolean;
  }) => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 w-full">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </h2>
          <Icon />
        </div>

        <div>
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md" />
          ) : (
            <p className="text-3xl font-bold text-gray-900">
              {value.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen px-2 md:px-0 py-10 flex flex-col gap-10">
      
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Monitor platform performance and transaction activity in real-time.
          </p>
        </div>
      </section>

      {/* Customers Overview */}
      <CustomersCount />

      {/* Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Deposits"
          value={totalDeposits}
          loading={depositsLoading}
        />
        <StatCard
          title="Total Withdrawals"
          value={totalWithdrawals}
          loading={withdrawalsLoading}
        />
        <StatCard
          title="Total Transactions"
          value={totalCount}
        />
      </section>

      {/* Bottom Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side */}
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <BannerViewer />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-6">
          <div>
            <Recent />
          </div>

          <div>
            <MinimumDeposits />
          </div>
        </div>
      </section>
    </main>
  );
}