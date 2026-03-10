/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
'use client';
import { fetchRecentFiatWithdrawalsFn } from '@/api/fiat-transaction';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import withQuery from '../Helpers/withQuery';
import { AuthContext } from '@/components/AuthProvider';
const refetchInterval = 30000;

const components = {
  Loading: Spinner,
  ServiceError,
};

/**
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @return {JSX.Element}
 */
export function withFetchRecentFiatWithdrawalsQuery(Component, options) {
  return (props) => {
    return withQuery(Component, {
      hook: (hookProps) => useFetchRecentFiatWithdrawalsQuery({ ...hookProps }), // Passed from props
      components,
      ...options,
    })(props);
  };
}

/**
 * Use fetch available technicians Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} [props.options] useQuery Options
 * @todo: Consolidate with Search
 * @return {object} Massaged Query
 */

export function useFetchRecentFiatWithdrawalsQuery({
  page,
  options = {
    refetchInterval,
    notifyOnChangeProps: ['data', 'error'],
  },
} = {}) {
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;
  const response = useQuery({
    queryKey: ['recentFiatWithdrawals', id, page], // Add  to the query key
    queryFn: () => fetchRecentFiatWithdrawalsFn(id, page), // Pass  to fetchTasksFn
    options,
  });

  const { data: recentFiatWithdrawals, ...rest } = response;

  const retdata = useMemo(() => {
    const retdata = {
      data: {
        recentFiatWithdrawals: recentFiatWithdrawals?.data ? recentFiatWithdrawals.data : null,
        refetch: response.refetch,
      },
    };
    // console.log(retdata)
    return retdata;
  }, [recentFiatWithdrawals]);

  return { ...retdata, ...rest };
}

export default useFetchRecentFiatWithdrawalsQuery;
