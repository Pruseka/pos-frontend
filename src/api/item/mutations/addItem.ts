import apiClient from '../../instance'

export interface Args {
   code: string
   name: string
   categoryId: string
}

export async function addItemMutation(
   url: string,
   { arg: { name, code, categoryId } }: Readonly<{ arg: Args }>
) {
   return await apiClient.post(url, {
      code,
      name,
      categoryId,
   })
}
