import withMutation from "../Helpers/withMutation";
import { logOutFn } from "@/api/users/users";


export function withLogoutMutation (Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: logOutFn,
    onSuccess: async (response: any) => {
      console.log(response)
      await localStorage.removeItem('user_info')
    },
    onError: (error) => {
      console.log(error, 'Log out - error message')
    }
  })

  return ComponentWithMutation
}

