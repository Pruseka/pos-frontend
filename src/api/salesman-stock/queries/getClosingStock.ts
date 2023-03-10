import apiClient from '../../instance'

export type GetSalesmanClosingStocksData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
}[]

export type GetSalesmanClosingStocksResponse = {
   status: string
   data: GetSalesmanClosingStocksData
}

export async function getSalesmanClosingStocks(url: string, to: string, userId: string) {
   const { data } = await apiClient.get(`${url}?to=${to}&userId=${userId}`)
   return data
}
