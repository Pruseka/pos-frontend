import { CustomerType } from '../../customer/queries/getAllCustomers'
import apiClient from '../../instance'

export type Item = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
   price: number
   amount: number
}

export enum PaymentType {
   CASH = 'cash',
   CREDIT = 'credit',
   RETURN = 'return',
   CANCEL = 'cancel',
   DAMAGE = 'damage',
}

export type GetInvoiceData = {
   createdBy: string
   customer: string
   customerType: CustomerType
   type: PaymentType
   amount: number
   createdAt: Date
   items: Item[]
}

export type GetInvoiceResponse = {
   status: string
   data: GetInvoiceData
}

export async function getInvoiceById(url: string, invoiceId: string) {
   const { data } = await apiClient.get(`${url}/${invoiceId}`)
   return data
}
