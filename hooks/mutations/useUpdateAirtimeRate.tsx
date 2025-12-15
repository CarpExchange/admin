import withMutation from '../Helpers/withMutation';
import { updateAirtimeRateFn } from '@/api/wallet';

export function withUpdateAirtimeRateMutation(Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: updateAirtimeRateFn,
  });

  return ComponentWithMutation;
}
