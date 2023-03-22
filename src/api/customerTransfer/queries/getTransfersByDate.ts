import apiClient from '../../instance'

export type Item = {
   itemId: string
   qty: number
}

export enum CustomerTransferType {
   IN = 'in',
   OUT = 'out',
}

export type GetAllCustomerTransfersData = {
   customerTransferId: string
   customer: string
   type: CustomerTransferType
   createdBy: string
   createdAt: Date
   items: Item[]
}[]

export type GetAllCustomerTransfersResponse = {
   status: string
   data: GetAllCustomerTransfersData
}

export async function getCustomerTransfersByDate(url: string, from: string, to: string) {
   if (!from || !to) return

   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
