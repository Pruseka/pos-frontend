import apiClient from '../../instance'

export type GetAllSuppliersData = {
   supplierId: string
   code: string
   name: string
   phone?: string
   address?: string
}[]

export type GetAllSuppliersResponse = {
   status: string
   data: GetAllSuppliersData
}

export async function getAllSuppliers(url: string) {
   const { data } = await apiClient.get(url)
   return data
}
