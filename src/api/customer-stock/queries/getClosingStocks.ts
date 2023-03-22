import apiClient from '../../instance'

export type GetCustomerClosingStocksData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
}[]

export type GetCustomerClosingStocksResponse = {
   status: string
   data: GetCustomerClosingStocksData
}

export async function getCustomerClosingStocks(url: string, to: string, customerId: string) {
   const { data } = await apiClient.get(`${url}?to=${to}&customerId=${customerId}`)
   return data
}
