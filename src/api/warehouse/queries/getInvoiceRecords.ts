import apiClient from '../../instance'
import { TransferType } from '../../transfer/queries/getTransfersByDate'

export type InvoicesList = {
   customer: string
   invoiceItemId: string
   invoiceId: string
   type: TransferType
   qty: number
   createdAt: Date
}[]

export type GetWarehouseInvoiceRecordsData = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
   list: InvoicesList
}[]

export type GetWarehouseInvoiceRecordsResponse = {
   status: string
   data: GetWarehouseInvoiceRecordsData
}

export async function getWarehouseInvoiceRecords(url: string, from: string, to: string) {
   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
