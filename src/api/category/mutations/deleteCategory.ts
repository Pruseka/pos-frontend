import apiClient from '../../instance'

export interface Args {
   categoryId: string
   name: string
}

export async function updateCategoryMutation(
   url: string,
   { arg: { categoryId, name } }: Readonly<{ arg: Args }>
) {
   return await apiClient.put(url, {
      categoryId,
      name,
   })
}
