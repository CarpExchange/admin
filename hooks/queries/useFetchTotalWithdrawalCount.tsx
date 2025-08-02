/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import withQuery from '../Helpers/withQuery';
import { AuthContext } from '@/components/AuthProvider';
import { fetchAllUsersWithdrawalsCountFn } from '@/api/fiat-transaction';


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

export function withFetchWithdrawalsCount(Component, options) {
  return (props) => {
    return withQuery(Component, {
      hook: (hookProps) => useFetchWithdrawalsCount({ ...hookProps }), // Passed from props
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

export function useFetchWithdrawalsCount({
  options = {},
} = {}) {
  const { state: {user_info} } = useContext(AuthContext)
  const id = user_info?.uid
  const response = useQuery({
    queryKey: ['totalWithdrawalsCount', id],
    queryFn: () => fetchAllUsersWithdrawalsCountFn(id),
    refetchInterval,
    notifyOnChangeProps: ['data', 'error'],
    ...options,
  });

  const { data: totalCount, ...rest } = response;

  const retdata = useMemo(() => {
    const retdata = {
      withdrawalsCount: {
        totalCount: totalCount?.data
          ? totalCount.data
          : null,
      },
    };
    // console.log(retdata)
    return retdata;
  }, [totalCount]);

  return { ...retdata, ...rest };
}

export default useFetchWithdrawalsCount;

