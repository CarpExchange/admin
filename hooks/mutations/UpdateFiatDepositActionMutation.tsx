import withMutation from '../Helpers/withMutation';
import { updateFiatDepositStatusFn } from '@/api/fiat-transaction';

export function withUpdateFiatDepositActionMutation(Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: updateFiatDepositStatusFn,
    onSuccess: async (response: any) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error, 'Update Fiat Deposit - error message');
    },
  });

  return ComponentWithMutation;
}
