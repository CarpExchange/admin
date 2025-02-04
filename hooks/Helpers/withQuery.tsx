import React, {FC, ComponentType} from 'react';
import {useQuery, UseQueryResult, QueryKey} from '@tanstack/react-query';
import {isUndefined} from 'lodash';

/**
 * Base withQuery Abstraction
 *
 * Return an element based on Query State
 *
 * @param {ComponentType} Component Component to wrap
 * @param {object} options Query Options
 * @param {function} options.hook Callable Hook
 * @param {object} options.components Hook Components
 * @return {JSX.Element} Return a composed component
 */

interface WithQueryOptions<
  TData,
  TError extends object,
  TVariables extends QueryKey = QueryKey,
> {
  hook?: (props: TVariables) => UseQueryResult<TData, TError>;
  components?: {
    Loading: ComponentType<any>;
    ServiceError: ComponentType<{message?: any}>;
  };
}

export default function withQuery<
  TData extends React.JSX.IntrinsicAttributes,
  TError extends object,
  TVariables extends QueryKey = QueryKey,
>(
  Component: ComponentType<TData>,
  // @ts-ignore
  {hook = useQuery, components}: WithQueryOptions<TData, TError, TVariables>,
): ComponentType<TData> {
  if (
    isUndefined(components) ||
    isUndefined(components.Loading) ||
    isUndefined(components.ServiceError)
  ) {
    throw new Error('Component must have Loading and Error components');
  }
  const {Loading, ServiceError} = components;
  /**
   * Wrapped Component
   * @param {object} props
   * @return {JSX.Element}
   */
  const WithQueryWrapper: FC<TData> = props => {
    const {isSuccess, isLoading, isError, data, error} = hook(
      props as unknown as TVariables,
    );
    if (isSuccess) return <Component {...props} {...data} />;
    if (isLoading)
      return <Loading {...props} {...(data as unknown as TData)} />;
    if (isError) {
      if ('message' in error) {
        return (
          <ServiceError {...(data as TData)} message={error.message || ''} />
        );
      }
      return <ServiceError {...(data as TData)} />;
    }
    return null;
  };

  return WithQueryWrapper;
}
