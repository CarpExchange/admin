"use client";


import BannerViewer from "@/components/banners/Banners";
import CustomersCount from "@/components/customersCount/customersCount";
import MinimumDeposits from "@/components/minimumDeposits/MinimumDeposits";
import Recent from "@/components/recentTransactions/recent";
import useFetchDepositsCount from "@/hooks/queries/useFetchTotalDepositCount";
import useFetchWithdrawalsCount from "@/hooks/queries/useFetchTotalWithdrawalCount";
import Icon from "@/public/assets/svgs/icon";


export default function Home() {

  const { depositscount } = useFetchDepositsCount();

  // totalCount is under data.totalCount
  const totalDeposits = depositscount?.totalCount ?? 0;

  const { withdrawalsCount } = useFetchWithdrawalsCount();

  // totalCount is under data.totalCount
  const totalWithdrawals = withdrawalsCount?.totalCount ?? 0;

  const totalCount = totalDeposits + totalWithdrawals;

  return (
    <main className="flex min-h-screen flex-col w-full gap-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center w-full mt-10">
        <div>
          <h1 className="text-[20px] md:text-[35px] font-semibold">Welcome onboard, </h1>
          <p>This is your dashboard where you get everything in one click</p>
        </div>
        <button className="hidden md:block border border-gray-300 p-2 rounded-[6px]">
          Export CSV
        </button>
      </div>

      
        {/* Total Users */}
        <CustomersCount />

      {/* Main section */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
        <div className="border border-gray-300 w-full md:w-1/3 rounded-[6px]">
          <div className="flex flex-col gap-4 p-4">
            <h2 className="font-semibold">Total Deposit</h2>
            <div className="flex flex-row justify-between items-center">
              <div>
                <p>{totalDeposits > 0 ? totalDeposits : <span className="text-red-100">0</span>}</p>
              </div>
              <Icon />
            </div>

          </div>
        </div>

        {/* Total Transactions (placeholder) */}
        <div className="border border-gray-300 w-full md:w-1/3 rounded-[6px]">
          <div className="flex flex-col gap-4 p-4">
            <h2 className="font-semibold">Total Withdrawals</h2>
            <div className="flex flex-row justify-between items-center">
              <div>
                <p>{totalWithdrawals > 0 ? totalWithdrawals : <span className="text-red-100">0</span>}</p>
              </div>
              <Icon />
            </div>
          </div>
        </div>

        {/* Total Volume Transacted (placeholder) */}
        <div className="border border-gray-300 w-full md:w-1/3 rounded-[6px]">
          <div className="flex flex-col gap-4 p-4">
            <h2 className="font-semibold">Total Transaction Count</h2>
            <div className="flex flex-row justify-between items-center">
              <div>
                <p>{totalCount.toLocaleString()}</p>
              </div>
              <Icon />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
        <div className="w-full md:w-2/3">
          <BannerViewer />
        </div>
        <div className="w-full md:w-1/3">
          <div className="border border-gray-300 rounded-[6px] p-4">
            {/* Placeholder for recent transactions */}
            <Recent/>
          </div>
          <br />
          <MinimumDeposits/>
        </div>
      </div>
    </main>
  );
}