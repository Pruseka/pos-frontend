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
   DAMAGE = 'damage',
}

export type GetAllCreditInvoicesData = {
   invoiceId: string
   customer: string
   status: Status
   amount: number
   receivedAt: Date | null
   createdAt: Date
   createdBy: string
   receivedBy: string
}[]

export type GetAllCreditInvoicesResponse = {
   status: string
   data: GetAllCreditInvoicesData
}

export async function getCreditInvoicesByDate(url: string, from: string, to: string) {
   if (!from || !to) return

   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
