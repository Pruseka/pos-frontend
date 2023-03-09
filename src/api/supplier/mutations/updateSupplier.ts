import apiClient from '../../instance'

export interface Args {
   supplierId: string
   code: string
   name: string
   phone: string
   address: string
}

export async function updateSupplierMutation(
   url: string,
   { arg: { supplierId, name, code, phone, address } }: Readonly<{ arg: Args }>
) {
   return await apiClient.put(url, {
      supplierId,
      name,
      code,
      phone,
      address,
   })
}
