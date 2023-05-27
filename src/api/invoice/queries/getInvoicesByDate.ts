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

export enum PaymentType {
   CASH = 'cash',
   CREDIT = 'credit',
   RETURN = 'return',
   CANCEL = 'cancel',
   ADJUST = 'adjust',
}

export type GetAllInvoicesData = {
   invoiceId: string
   createdBy: string
   customer: string
   customerType: CustomerType
   type: PaymentType
   amount: number
   createdAt: Date
}[]

export type GetAllInvoicesResponse = {
   status: string
   data: GetAllInvoicesData
}

export async function getInvoicesByDate(url: string, from: string, to: string) {
   if (!from || !to) return

   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
