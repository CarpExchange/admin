'use client';
import { fetchFiatWithdrawalFn } from '@/api/fiat-transaction';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import withQuery from '../Helpers/withQuery';
import { AuthContext } from '@/components/AuthProvider';
const refetchInterval = 3000;

const components = {
  Loading: Spinner,
  ServiceError,
};

/**
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @return {JSX.Element}
 */
export function withFetchFiatWithdrawalQuery(Component, options) {
  return (props) => {
    return withQuery(Component, {
      hook: (hookProps) => useFetchFiatWithdrawalQuery({ ...hookProps }), // Passed from props
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

export function useFetchFiatWithdrawalQuery({
  page_start,
  page_end,
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
    queryKey: ['fiatWithdrawals', id], // Add  to the query key
    queryFn: () => fetchFiatWithdrawalFn(id, page_start, page_end), // Pass  to fetchTasksFn
    options,
  });

  const { data: fiatWithdrawals, ...rest } = response;

  const retdata = useMemo(() => {
    const retdata = {
      data: {
        fiatWithdrawals: fiatWithdrawals?.data ? fiatWithdrawals.data : null,
      },
    };
    return retdata;
  }, [fiatWithdrawals]);

  return { ...retdata, ...rest };
}

export default useFetchFiatWithdrawalQuery;
