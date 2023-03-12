import apiClient from '../../instance'
import { TransferType } from '../../transfer/queries/getTransfersByDate'

export type TransfersList = {
   user: string
   transferItemId: string
   transferId: string
   type: TransferType
   qty: number
   createdAt: Date
}[]

export type GetWarehouseOutStocksData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
   list: TransfersList
}[]

export type GetWarehouseOutStocksResponse = {
   status: string
   data: GetWarehouseOutStocksData
}

export async function getWarehouseOutStocks(url: string, from: string, to: string) {
   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
