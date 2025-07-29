/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import { fetchAllUsersDepositCountFn } from '@/api/fiat-transaction';
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

export function withFetchCustomersQuery(Component, options) {
  return (props) => {
    return withQuery(Component, {
      hook: (hookProps) => useFetchDepositCount({ ...hookProps }),
      components,
      ...options,
    })(props);
  };
}

export function useFetchDepositCount({
  options = {
    refetchInterval,
  },
} = {}) {
  const {
    state: { user_info },
  } = useContext(AuthContext);

  const id = user_info?.uid;

  const response = useQuery({
    queryKey: ['depositCount', id],
    queryFn: () => fetchAllUsersDepositCountFn(id),
    ...options,
  });

  const { data: depositCount, ...rest } = response;

  const retdata = useMemo(() => {
    return {
      data: {
        depositCount: depositCount?.data ?? null,
      },
    };
  }, [depositCount]);
  console.log(retdata)

  return { ...retdata, ...rest };
}

export default useFetchDepositCount;
