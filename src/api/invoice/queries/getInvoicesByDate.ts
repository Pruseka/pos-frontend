import { CustomerType } from '../../customer/queries/getAllCustomers'
import apiClient from '../../instance'

export type Item = {
   itemId: string
   qty: number
}

export enum Status {
   PAID = 'paid',
   UNPAID = 'unpaid',
}

export enum InvoiceType {
   CASH = 'cash',
   CREDIT = 'credit',
   RETURN = 'return',
   CANCEL = 'cancel',
   DAMAGE = 'damage',
}

export type GetAllInvoicesData = {
   invoiceId: string
   createdByName: string
   customer: string
   customerType: CustomerType
   type: InvoiceType
   status: Status
   amount: number
   createdBy: string
   createdAt: Date
   items: Item[]
}[]

export type GetAllInvoicesResponse = {
   status: string
   data: GetAllInvoicesData
}

export async function getInvoicesByDate(url: string, from: string, to: string) {
   console.log('fetching')
   if (!from || !to) return

   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
