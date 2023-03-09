import apiClient from '../../instance'

export interface Args {
   userId: string
   name: string
   email: string
}

export async function updateUserMutation(
   url: string,
   { arg: { userId, name, email } }: Readonly<{ arg: Args }>
) {
   return await apiClient.put(url, {
      userId,
      name,
      email,
   })
}
