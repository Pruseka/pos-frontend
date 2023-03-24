import apiClient from '../../instance'

export interface Args {
   title: string
   description: string
   amount: number
}

export async function addExpenseMutation(
   url: string,
   { arg: { title, description, amount } }: Readonly<{ arg: Args }>
) {
   return await apiClient.post(url, {
      title,
      description,
      amount,
   })
}
