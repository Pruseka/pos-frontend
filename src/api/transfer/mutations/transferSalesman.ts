import apiClient from '../../instance'
import { Item, TransferType } from '../queries/getTransfersByDate'

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
