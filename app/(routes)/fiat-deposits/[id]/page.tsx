import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const FiatDepositDetails = ({  }: any) => {
  return (
    <div className="bg-gray-100 h-full max-h-full pt-[24px] pb-[48px] px-[20px]">
      <Link
        href="/settings"
        className="flex flex-row gap-4 items-center w-fit mb-6"
      >
        <div className="w-[32px] h-[32px] rounded-[23px] bg-blue-200 flex items-center justify-center">
          <ArrowLeft color="#039" size={24} />
        </div>
        <span className="text-primary font-figtree font-semibold">Go back</span>
      </Link>
      <div className="flex flex-col gap-[28px]">
        <div className="flex flex-col gap-1 font-figtree text-secondary">
          <h2 className="font-semibold text-2xl ">Fiat Deposit Details</h2>
          <p className="text-secondary">
            Manage and update deposits
          </p>
        </div>


      </div>
    </div>
  )
}

export default FiatDepositDetails