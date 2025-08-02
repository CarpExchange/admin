/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
// import { fetchAllUsersDepositCountFn } from '@/api/users';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import withQuery from '../Helpers/withQuery';
import { AuthContext } from '@/components/AuthProvider';
import { fetchAllUsersDepositCountFn } from '@/api/fiat-transaction';


const refetchInterval = 30000; // 30000 milliseconds is equal to 30 seconds

const components = {
  Loading: Spinner,
  ServiceError,
};

/**
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @return {JSX.Element}
 */

export function withFetchDepositsCount(Component, options) {
  return (props) => {
    return withQuery(Component, {
      hook: (hookProps) => useFetchDepositsCount({ ...hookProps }), // Passed from props
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

export function useFetchDepositsCount({
  options = {},
} = {}) {
  const { state: {user_info} } = useContext(AuthContext)
  const id = user_info?.uid
  const response = useQuery({
    queryKey: ['totalCount', id],
    queryFn: () => fetchAllUsersDepositCountFn(id),
    refetchInterval,
    notifyOnChangeProps: ['data', 'error'],
    ...options,
  });

  const { data: totalCount, ...rest } = response;

  const retdata = useMemo(() => {
    const retdata = {
      depositscount: {
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

export default useFetchDepositsCount;

