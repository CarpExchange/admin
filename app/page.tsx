

import Icon from "@/public/assets/svgs/icon";

export default function Home() {
  

  
  return (
    <main className="flex min-h-screen flex-col w-full gap-8">
      <div className="flex flex-row justify-between items-center w-full mt-10">
        <div>
          <h1 className="text-[35px] font-semibold">Welcome onboard, </h1>
          <p>This is your dashboard where you get everything in one click</p>
        </div>
        <button className="border border-gray-300 p-2 rounded-[6px]">
          Export CSV
        </button>
      </div>

      {/* Main section */}
      <div className="flex flex-row justify-between items-center w-full gap-4">
        {/* Total Users */}
        <div className="border border-gray-300 w-1/3 rounded-[6px]">
          <div className="flex flex-col gap-4 p-4">
            <h2 className="font-semibold">Total Users</h2>
            <div className="flex flex-row justify-between items-center">
              <div>
                {/* <p>{isLoading ? 'Loading...' : totalDeposit}</p> */}
                <p className="text-[10px] text-green-600">10% high</p>
              </div>
              <Icon />
            </div>
            {/* {error && (
              <p className="text-[10px] text-red-500">Failed to fetch data</p>
            )} */}
          </div>
        </div>

        {/* Total Transactions (placeholder) */}
        <div className="border border-gray-300 w-1/3 rounded-[6px]">
          <div className="flex flex-col gap-4 p-4">
            <h2 className="font-semibold">Total Transactions</h2>
            <div className="flex flex-row justify-between items-center">
              <div>
                <p>200</p>
                <p className="text-[10px]">10% high</p>
              </div>
              <Icon />
            </div>
          </div>
        </div>

        {/* Total Volume Transacted (placeholder) */}
        <div className="border border-gray-300 w-1/3 rounded-[6px]">
          <div className="flex flex-col gap-4 p-4">
            <h2 className="font-semibold">Total Volume Transacted</h2>
            <div className="flex flex-row justify-between items-center">
              <div>
                <p>200</p>
                <p className="text-[10px]">10% high</p>
              </div>
              <Icon />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
