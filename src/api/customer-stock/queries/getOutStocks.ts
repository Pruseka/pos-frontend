import apiClient from '../../instance'
import { TransferType } from '../../transfer/queries/getTransfersByDate'

export type CustomerInOutStocksList = {
   customerTransferItemId: string
   customerTransferId: string
   customerId: string
   type: TransferType
   qty: number
   createdAt: Date
}[]

export type GetCustomerOutStocksData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
   list: CustomerInOutStocksList
}[]

export type GetCustomerOutStocksResponse = {
   status: string
   data: GetCustomerOutStocksData
}

export async function getCustomerOutStocks(url: string, from: string, to: string, customerId: string) {
   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}&customerId=${customerId}`)
   return data
}
