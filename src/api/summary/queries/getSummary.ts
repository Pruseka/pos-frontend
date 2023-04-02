import apiClient from '../../instance'

export type GetSummaryData = {
   openingBalance: number
   closingBalance: number
   purchasingAmount: number
   sellingAmount: number
   cogs: number
   grossProfit: number
   expenseAmount: number
   netProfit: number
   cashIn: number
   cashOut: number
   balance: number
}

export type GetSummaryResponse = {
   status: string
   data: GetSummaryData
}

export async function getSummary(url: string, from: string, to: string) {
   const { data } = await apiClient.get(`${url}?from=${from}&to=${to}`)
   return data
}
