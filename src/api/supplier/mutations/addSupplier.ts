import apiClient from '../../instance'

export interface Args {
   supplierId: string
   code: string
   name: string
   phone: string
   address: string
}

export async function addSupplierMutation(
   url: string,
   { arg: { supplierId, code, name, phone, address } }: Readonly<{ arg: Args }>
) {
   return await apiClient.post(url, {
      supplierId,
      code,
      name,
      phone,
      address,
   })
}
