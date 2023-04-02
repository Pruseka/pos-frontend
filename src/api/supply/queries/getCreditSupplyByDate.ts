import apiClient from '../../instance'

export enum Status {
   PAID = 'paid',
   UNPAID = 'unpaid',
}

export type GetAllCreditSuppliesData = {
   supplyId: number
   supplier: string
   status: Status
   amount: number
   createdBy: string
   createdAt: Date
   withdrawnAt: Date
   withdrawnBy: string
}[]

export type GetAllCreditSuppliesResponse = {
   status: string
   data: GetAllCreditSuppliesData
}

export async function getCreditSuppliesByDate(url: string, from: string, to: string) {
   if (!from || !to) return

   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
