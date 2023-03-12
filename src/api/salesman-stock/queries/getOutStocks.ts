import apiClient from '../../instance'
import { PaymentType } from '../../invoice/queries/getInvoicesByDate'

export type OutStocksList = {
   customer: string
   invoiceItemId: string
   invoiceId: string
   type: PaymentType
   qty: number
   createdAt: Date
}[]

export type GetSalesmanOutStocksData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
   list: OutStocksList
}[]

export type GetSalesmanOutStocksResponse = {
   status: string
   data: GetSalesmanOutStocksData
}

export async function getSalesmanOutStocks(url: string, from: string, to: string, userId: string) {
   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}&userId=${userId}`)
   return data
}
