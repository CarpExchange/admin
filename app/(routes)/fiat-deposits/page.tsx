"use client"
import { withFetchFiatDepositsQuery } from '@/hooks/queries/useFetchFiatDepositsQuery'
import React from 'react'
import ServiceError from '@/components/ServiceError'
import Spinner from '@/components/Spinner'

const FiatDeposits = ({ fiatDeposits }: any) => {
  console.log(fiatDeposits)
  return (
    <div>FiatDeposits</div>
  )
}

export default withFetchFiatDepositsQuery(FiatDeposits, {
  components: { ServiceError: ServiceError, Loading: Spinner },
});