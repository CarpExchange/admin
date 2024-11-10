import { fetchAUserDetailsFn } from '@/api/users';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import withQuery from '../Helpers/withQuery';
import { AuthContext } from '@/components/AuthProvider';
import { useSearchParams } from 'next/navigation';
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
  options = {
    refetchInterval,
    notifyOnChangeProps: ['data', 'error'],
  },
} = {}) {
  const { id } = useSearchParams()
  const { state: {user_info} } = useContext(AuthContext)
  const uid = user_info?.uid
  const data = { id, uid }

  const response = useQuery({
    queryKey: ['singleUserDetails', id, uid], // Add  to the query key
    queryFn: () => fetchAUserDetailsFn(data), // Pass  to fetchTasksFn
    options,
  });

  const { data: singleUserDetails, ...rest } = response;

  const retdata = useMemo(() => {
    const retdata = {
      data: {
        singleUserDetails: singleUserDetails?.data ? singleUserDetails.data : null,
      },
    };
    return retdata;
  }, [singleUserDetails]);

  return { ...retdata, ...rest };
}

export default useFetchAUserQuery;

