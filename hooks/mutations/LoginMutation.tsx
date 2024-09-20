import withMutation from "../Helpers/withMutation";
import { loginFn } from "@/api/users/users";


export function withLoginMutation (Component: any) {
  const ComponentWithMutation = withMutation(Component, {
    mutation: loginFn,
    onSuccess: async (response: any) => {
      console.log(response, 'Log in - response')
      console.log(response.data, 'Log in - response data')
      console.log(typeof(response.data), 'Log in - response data type')
      await localStorage.setItem('user_info', JSON.stringify(response.data))
    },
    onError: (error) => {
      console.log(error, 'Log in - error message')
    }
  })

  return ComponentWithMutation
}

