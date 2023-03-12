import apiClient from '../../instance'
import { TransferType } from '../../transfer/queries/getTransfersByDate'

export type InStocksList = {
   transferItemId: string
   transferId: string
   type: TransferType
   qty: number
   createdAt: Date
}[]

export type GetSalesmanInStocksData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
   list: InStocksList
}[]

export type GetSalesmanInStocksResponse = {
   status: string
   data: GetSalesmanInStocksData
}

export async function getSalesmanInStocks(url: string, from: string, to: string, userId: string) {
   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}&userId=${userId}`)
   return data
}
