import withMutation from '../Helpers/withMutation';
import { updateAdminAccountDetailFn } from '@/api/fiat-transaction';

export function withUpdateAdminAccountDetailMutation(Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: updateAdminAccountDetailFn,
    onSuccess: async (response: any) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error, 'Admin account - error message');
    },
  });

  return ComponentWithMutation;
}
