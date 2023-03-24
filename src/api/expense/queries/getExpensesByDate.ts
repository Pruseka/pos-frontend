import apiClient from '../../instance'

export type GetExpensesByDateData = {
   expenseId: string
   title: string
   description: string
   amount: number
}[]

export type GetExpensesByDateResponse = {
   status: string
   data: GetExpensesByDateData
}

export async function getExpensesByDate(url: string, from: string, to: string) {
   if (!from || !to) return
   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
