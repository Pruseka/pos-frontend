import apiClient from '../../instance'

export type Item = {
   itemId: string
   qty: number
}

export enum SupplyType {
   CASH = 'cash',
   CREDIT = 'credit',
   RETURN = 'return',
   CANCEL = 'cancel',
}

export type GetAllSuppliesData = {
   supplyId: string
   supplier: string
   type: SupplyType
   amount: number
   createdBy: string
   createdAt: Date
}[]

export type GetAllSuppliesResponse = {
   status: string
   data: GetAllSuppliesData
}

export async function getSuppliesByDate(url: string, from: string, to: string) {
   if (!from || !to) return

   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
