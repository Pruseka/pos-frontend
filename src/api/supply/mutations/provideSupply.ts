import apiClient from '../../instance'
import { Item, SupplyType } from '../queries/getSupplyByDate'

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
