import apiClient from '../../instance'

export interface Args {
   itemId: string
   purchasingPrice: number
   retailPrice: number
   wholesalesPrice: number
}

export async function updatePriceMutation(
   url: string,
   { arg: { itemId, purchasingPrice, retailPrice, wholesalesPrice } }: Readonly<{ arg: Args }>
) {
   return await apiClient.put(url, {
      itemId,
      purchasingPrice,
      retailPrice,
      wholesalesPrice,
   })
}
