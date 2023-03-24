import { TransferItemList } from './../../transfer/queries/getTransfersByDate'
import apiClient from '../../instance'

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
   items: TransferItemList
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
