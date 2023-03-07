import { CustomerType } from '../../customer/queries/getAllCustomers'
import apiClient from '../../instance'
import { InvoiceType, Item } from '../queries/getInvoicesByDate'

export interface Args {
   customer: string
   customerType: CustomerType
   type: InvoiceType
   items: Item[]
}

export async function createInvoiceMutation(
   url: string,
   { arg: { customer, customerType, type, items } }: Readonly<{ arg: Args }>
) {
   return await apiClient.post(url, {
      customer,
      customerType,
      type,
      items,
   })
}
