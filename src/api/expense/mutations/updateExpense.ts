import apiClient from '../../instance'

export interface Args {
   expenseId: string
   title: string
   description: string
   amount: number
}

export async function updateExpenseMutation(
   url: string,
   { arg: { expenseId, title, description, amount } }: Readonly<{ arg: Args }>
) {
   return await apiClient.put(url, {
      expenseId,
      title,
      description,
      amount,
   })
}
