import withMutation from '../Helpers/withMutation';
import { blacklistUserFn } from '@/api/users/users';

export function withBlacklistUserMutation(Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: blacklistUserFn,
  });

  return ComponentWithMutation;
}
