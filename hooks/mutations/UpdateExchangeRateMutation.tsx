import withMutation from '../Helpers/withMutation';
import { updateExchangeRateFn } from '@/api/wallet';

export function withUpdateExchangeRateMutation(Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: updateExchangeRateFn,
    onSuccess: async (response: any) => {
      // console.log(response)
    },
    onError: (error) => {
      console.log(error, 'Update rate - error message');
    },
  });

  return ComponentWithMutation;
}
