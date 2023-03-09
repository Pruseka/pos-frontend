import apiClient from '../../instance'

export interface Args {
   name: string
   email: string
   password: string
}

export async function createUserMutation(url: string, { arg: { name } }: Readonly<{ arg: Args }>) {
   return await apiClient.post(url, {
      name,
   })
}
