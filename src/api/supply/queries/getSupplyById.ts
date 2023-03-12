import apiClient from '../../instance'
import { SupplyType } from './getSupplyByDate'

export type Item = {
   itemId: string
   code: string
   name: string
   category: string
   qty: number
   price: number
   amount: number
}

export type GetSupplyData = {
   createdBy: string
   supplier: string
   type: SupplyType
   amount: number
   items: Item[]
}

export type GetSupplyResponse = {
   status: string
   data: GetSupplyData
}

export async function getSupplyById(url: string, invoiceId: string) {
   const { data } = await apiClient.get(`${url}/${invoiceId}`)
   return data
}
