import apiClient from '../../instance'
import { Item } from '../queries/getInvoicesByDate'

export enum SupplyType {
   CASH = 'cash',
   CREDIT = 'credit',
   RETURN = 'return',
   CANCEL = 'cancel',
}

export interface Args {
   supplier: string
   type: SupplyType
   items: Item[]
}

export async function provideSupplyMutation(
   url: string,
   { arg: { supplier, type, items } }: Readonly<{ arg: Args }>
) {
   return await apiClient.post(url, {
      supplier,
      type,
      items,
   })
}
