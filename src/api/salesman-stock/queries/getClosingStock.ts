import apiClient from '../../instance'

export type GetSalesmanClosingStockData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
}[]

export type GetSalesmanClosingStockResponse = {
   status: string
   data: GetSalesmanClosingStockData
}

export async function getSalesmanClosingStocks(url: string, to: string, userId: string) {
   const { data } = await apiClient.get(`${url}?to=${to}&userId=${userId}`)
   return data
}
