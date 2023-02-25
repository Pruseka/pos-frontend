import { CustomerType } from './../queries/getAllCustomers'
import apiClient from '../../instance'

export interface Args {
   code: string
   name: string
   type: CustomerType
   phone: string
   address: string
}

export async function addCustomerMutation(
   url: string,
   { arg: { code, name, type, phone, address } }: Readonly<{ arg: Args }>
) {
   return await apiClient.post(url, {
      code,
      name,
      type,
      phone,
      address,
   })
}
