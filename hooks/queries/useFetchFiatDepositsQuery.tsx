
import { fetchCostingByIdFn } from '@/api/costings';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import withQuery from '../Helpers/withQuery';
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
export function withFetchCostingByIdQuery(Component, options) {
  return (props) => {
    return withQuery(Component, {
      hook: (hookProps) => useFetchDashboardDetailsQuery({ ...hookProps }), // Passed from props
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

export function useFetchCostingByIdQuery({
  options = {
    refetchInterval,
    notifyOnChangeProps: ['data', 'error'],
  },
} = {}) {
  const response = useQuery({
    queryKey: ['dashboardDetails'], // Add  to the query key
    queryFn: () => fetchDashboardDetailsFn(), // Pass  to fetchTasksFn
    options,
  });

  const { data: dashboardDetails, ...rest } = response;

  const retdata = useMemo(() => {
    const retdata = {
      data: {
        dashboardDetails: dashboardDetails?.data ? dashboardDetails.data : null,
      },
    };
    return retdata;
  }, [dashboardDetails]);

  return { ...retdata, ...rest };
}

export default useFetchDashboardDetailsQuery;

