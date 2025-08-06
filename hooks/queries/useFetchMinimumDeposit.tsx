/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import withQuery from '../Helpers/withQuery';
import { AuthContext } from '@/components/AuthProvider';
import { fetchMinimumDepositsFn } from '@/api/banners';



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

export function withFetchMinimumDeposits(Component, options) {
    return (props) => {
        return withQuery(Component, {
            hook: (hookProps) => useFetchMinimumDeposits({ ...hookProps }), // Passed from props
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

export function useFetchMinimumDeposits({
    options = {},
} = {}) {
    const { state: { user_info } } = useContext(AuthContext)
    const id = user_info?.uid
    // console.log(id)

    const response = useQuery({
        queryKey: ['fetchMinimumDeposits', id],
        queryFn: () => fetchMinimumDepositsFn(id),
        refetchInterval,
        enabled: !!id,
        notifyOnChangeProps: ['data', 'error'],
        ...options,
    });

    const { data: minimumDeposits, ...rest } = response;

    const retdata = useMemo(() => {
        const retdata = {
            minimumDeposits: {
                minimumDeposits: minimumDeposits?.data
                    ? minimumDeposits?.data
                    : null,
            },
        };
        // console.log(retdata)
        return retdata.data;
    }, [minimumDeposits]);

    return { ...retdata, ...rest };
}

export default useFetchMinimumDeposits;

