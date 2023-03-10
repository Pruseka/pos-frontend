import { SupplyType } from './../../supply/queries/getSupplyByDate'
import apiClient from '../../instance'

export type SuppliesList = {
   supplier: string
   supplyItemId: string
   supplyId: string
   type: SupplyType
   qty: number
   createdAt: Date
}[]

export type GetWarehouseInStocksData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
   list: SuppliesList
}[]

export type GetWarehouseInStocksResponse = {
   status: string
   data: GetWarehouseInStocksData
}

export async function getWarehouseInStocks(url: string, from: string, to: string) {
   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
