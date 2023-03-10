import apiClient from '../../instance'
import { Item, CustomerTransferType } from '../queries/getTransfersByDate'

export interface Args {
   customerId: string
   type: CustomerTransferType
   items: Item[]
}

export async function transferCustomerMutation(
   url: string,
   { arg: { customerId, type, items } }: Readonly<{ arg: Args }>
) {
   return await apiClient.post(url, {
      customerId,
      type,
      items,
   })
}
