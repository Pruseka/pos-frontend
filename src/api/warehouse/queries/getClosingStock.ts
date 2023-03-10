import apiClient from '../../instance'

export type GetWarehouseClosingStocksData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
}[]

export type GetWarehouseClosingStocksResponse = {
   status: string
   data: GetWarehouseClosingStocksData
}

export async function getWarehouseClosingStocks(url: string, to: string) {
   const { data } = await apiClient.get(`${url}?to=${to}`)
   return data
}
