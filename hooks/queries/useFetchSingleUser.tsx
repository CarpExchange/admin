/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import { fetchAUserDetailsFn } from '@/api/users';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import withQuery from '../Helpers/withQuery';
import { AuthContext } from '@/components/AuthProvider';
import { useParams, useSearchParams } from 'next/navigation';
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
export function withFetchAUserQuery(Component, options) {
  return (props) => {
    return withQuery(Component, {
      hook: (hookProps) => useFetchAUserQuery({ ...hookProps }), // Passed from props
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

export function useFetchAUserQuery({
  userId,
  options = {
    refetchInterval,
    notifyOnChangeProps: ['data', 'error'],
  },
} = {}) {
  const { id: user_id } = useParams();
  // console.log(user_id, 'user_id')
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const uid = user_info?.uid;
  const id = userId || user_id;
  const data = { id, uid };
  // console.log(data, 'data')
  const response = useQuery({
    queryKey: ['singleUserDetails', id, uid], // Add  to the query key
    queryFn: () => fetchAUserDetailsFn(data), // Pass  to fetchTasksFn
    options,
  });

  const { data: singleUserDetails, ...rest } = response;

  const retdata = useMemo(() => {
    const retdata = {
      data: {
        singleUserDetails: singleUserDetails?.data
          ? singleUserDetails.data
          : null,
        refetch: response.refetch,
      },
    };
    return retdata;
  }, [singleUserDetails]);

  return { ...retdata, ...rest };
}

export default useFetchAUserQuery;
