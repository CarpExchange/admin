/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import withQuery from '../Helpers/withQuery';
import { fetchKriptDepositAccountDetail } from '@/api/fiat-transaction';
import { AuthContext } from '@/components/AuthProvider';

const refetchInterval = 3000;

const components = {
  Loading: Spinner,
  ServiceError,
};

/**
 * @param {JSX.Element | Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @return {JSX.Element}
 */
export function withFetchkriptDepositAccountDetailQuery(
  Component: any,
  options: any
) {
  return withQuery(Component, {
    hook: useFetchkriptDepositAccountDetailQuery,
    components,
    ...options,
  });
}

/**
 * Use fetch assets Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} [props.options] useQuery Options
 * @todo: Consolidate with Search
 * @return {object} Massaged Query
 */

export function useFetchkriptDepositAccountDetailQuery({
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
    queryKey: ['kriptAccountDetail', { id }],
    queryFn: () => fetchKriptDepositAccountDetail(id),
    ...options,
  });

  const { data: kriptAccountDetail, ...rest } = response;
  const resp = useMemo(() => {
    const retdata = {
      data: {
        kriptAccountDetail: kriptAccountDetail?.data
          ? kriptAccountDetail?.data
          : [],
      },
      ...rest,
    };
    return retdata;
  }, [kriptAccountDetail]);

  return resp;
}
