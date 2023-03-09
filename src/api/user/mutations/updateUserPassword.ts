import apiClient from '../../instance'

export interface Args {
   userId: string
   password: string
}

export async function updateUserPasswordMutation(
   url: string,
   { arg: { userId, password } }: Readonly<{ arg: Args }>
) {
   return await apiClient.put(url, {
      userId,
      password,
   })
}
