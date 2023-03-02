import apiClient from '../../instance'

export interface Args {
   itemId: string
   code: string
   name: string
   categoryId: string
}

export async function updateItemMutation(
   url: string,
   { arg: { itemId, code, name, categoryId } }: Readonly<{ arg: Args }>
) {
   return await apiClient.put(url, {
      itemId,
      code,
      name,
      categoryId,
   })
}
