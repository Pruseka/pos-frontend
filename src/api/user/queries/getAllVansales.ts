import apiClient from '../../instance'
import { UserRole } from '../mutations/createUser'

export type GetAllVansalesData = {
   userId: string
   name: string
   email: string
   password: string
   role: UserRole
   enable: true
   createdAt: Date
   updatedAt: Date
}[]

export type GetAllVansalesResponse = {
   status: string
   data: GetAllVansalesData
}

export async function getAllVansales(url: string) {
   const { data } = await apiClient.get(url)
   return data
}
