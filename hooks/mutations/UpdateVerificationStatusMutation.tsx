import withMutation from '../Helpers/withMutation';
import { updateUserVerficationStatusFn } from '@/api/users';

export function withUpdateVerificationStatusMutation(Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: updateUserVerficationStatusFn,
    onSuccess: async (response: any) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error, 'Update Verification status - error message');
    },
  });

  return ComponentWithMutation;
}
