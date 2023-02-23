import apiClient from '../../instance'

export type GetAllCategoriesData = {
   categoryId: string
   name: string
}[]

export type GetAllCategoriesResponse = {
   status: string
   data: GetAllCategoriesData
}

export async function getAllCategories(url: string) {
   const { data } = await apiClient.get(url)
   return data
}
