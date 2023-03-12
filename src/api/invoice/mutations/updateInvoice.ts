import apiClient from '../../instance'

export interface Args {
   invoiceId: string
}

export async function updateInvoiceMutation(url: string, { arg: { invoiceId } }: Readonly<{ arg: Args }>) {
   return await apiClient.put(url, {
      invoiceId,
   })
}
