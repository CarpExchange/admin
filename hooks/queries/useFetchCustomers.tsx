/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import { fetchAllUsersFn } from '@/api/users';
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

export function withFetchCustomersQuery(Component, options) {
  return (props) => {
    return withQuery(Component, {
      hook: (hookProps) => useFetchCustomersQuery({ ...hookProps }), // Passed from props
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

export function useFetchCustomersQuery({
  options = {
    refetchInterval,
    notifyOnChangeProps: ['data', 'error'],
  },
} = {}) {
  const { state: {user_info} } = useContext(AuthContext)
  const id = user_info?.uid
  const response = useQuery({
    queryKey: ['allCustomers', id], // Add  to the query key
    queryFn: () => fetchAllUsersFn(id), // Pass  to fetchTasksFn
    options,
  });

  const { data: allCustomers, ...rest } = response;

  const retdata = useMemo(() => {
    const retdata = {
      data: {
        allCustomers: allCustomers?.data ? allCustomers.data : null,
      },
    };
    return retdata;
  }, [allCustomers]);

  return { ...retdata, ...rest };
}

export default useFetchCustomersQuery;

