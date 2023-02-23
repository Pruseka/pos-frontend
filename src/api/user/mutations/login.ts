import apiClient from '../../instance'

export interface Credentials {
   email: string
   password: string
}

export async function loginMutation(
   url: string,
   { arg: { email, password } }: Readonly<{ arg: Credentials }>
) {
   return await apiClient.post(url, {
      email,
      password,
   })
}
