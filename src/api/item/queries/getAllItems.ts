import apiClient from '../../instance'

export type GetAllItemsData = {
   code: string
   name: string
   category: string
   itemId: string
   purchasingPrice?: number
   retailPrice?: number
   wholesalesPrice?: number
}[]

export type GetAllItemsResponse = {
   status: string
   data: GetAllItemsData
}

export async function getAllItems(url: string) {
   const { data } = await apiClient.get(url)
   return data
}
