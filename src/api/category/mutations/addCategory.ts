import apiClient from '../../instance'

export interface Args {
   name: string
}

export async function addCategoryMutation(url: string, { arg: { name } }: Readonly<{ arg: Args }>) {
   return await apiClient.post(url, {
      name,
   })
}
