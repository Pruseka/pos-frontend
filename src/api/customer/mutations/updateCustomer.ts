import apiClient from '../../instance'

export interface Args {
   customerId: string
   code: string
   name: string
   type: string
   phone: string
   address: string
}

export async function updateCustomerMutation(
   url: string,
   { arg: { customerId, name, code, type, phone, address } }: Readonly<{ arg: Args }>
) {
   return await apiClient.put(url, {
      customerId,
      name,
      code,
      type,
      phone,
      address,
   })
}
