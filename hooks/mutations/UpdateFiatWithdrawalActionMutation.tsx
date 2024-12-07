import withMutation from '../Helpers/withMutation';
import { updateFiatWithdrawalStatusFn } from '@/api/fiat-transaction';

export function withUpdateFiatWithdrawalActionMutation(Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: updateFiatWithdrawalStatusFn,
    onSuccess: async (response: any) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error, 'Update Fiat Withdrawal - error message');
    },
  });

  return ComponentWithMutation;
}
