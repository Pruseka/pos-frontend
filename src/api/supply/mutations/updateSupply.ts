import apiClient from '../../instance'

export interface Args {
   supplyId: string
}

export async function updateSupplyMutation(url: string, { arg: { supplyId } }: Readonly<{ arg: Args }>) {
   return await apiClient.put(url, {
      supplyId,
   })
}
