import withMutation from "../Helpers/withMutation";
import { loginFn } from "@/api/users/users";


export function withLoginMutation (Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: loginFn,
    onSuccess: async (response: any) => {
      await localStorage.setItem('user_info', response.data)
    },
    onError: (error) => {
      console.log(error, 'Log in - error message')
    }
  })

  return ComponentWithMutation
}

