import apiClient from '../../instance'
import { Item } from '../queries/getInvoicesByDate'

export enum TransferType {
   FROM = 'from',
   TO = 'to',
}

export interface Args {
   userId: string
   type: TransferType
   items: Item[]
}

export async function transferSalesmanMutation(
   url: string,
   { arg: { userId, type, items } }: Readonly<{ arg: Args }>
) {
   return await apiClient.post(url, {
      userId,
      type,
      items,
   })
}
