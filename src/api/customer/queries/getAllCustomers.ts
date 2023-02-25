import apiClient from '../../instance'

export enum CustomerType {
   RETAIL = 'retail',
   WHOLESALES = 'wholesales',
}

export type GetAllCustomersData = {
   code: string
   name: string
   type: CustomerType
   phone?: string
   address?: string
}[]

export type GetAllCustomersResponse = {
   status: string
   data: GetAllCustomersData
}

export async function getAllCustomers(url: string) {
   const { data } = await apiClient.get(url)
   return data
}
