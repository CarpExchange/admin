import withMutation from '../Helpers/withMutation';
import { updateProcessingFeeFn } from '@/api/wallet';

export function withUpdateProcessingFeeMutation(Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: updateProcessingFeeFn,
  });

  return ComponentWithMutation;
}
