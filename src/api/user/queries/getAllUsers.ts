import apiClient from '../../instance'

export enum UserRole {
   ADMIN = 'admin',
   SALESMAN = 'salesman',
}

export type GetAllUsersData = {
   userId: string
   name: string
   email: string
   password: string
   role: UserRole
   enable: true
   createdAt: Date
   updatedAt: Date
}[]

export type GetAllUsersResponse = {
   status: string
   data: GetAllUsersData
}

export async function getAllUsers(url: string) {
   const { data } = await apiClient.get(url)
   return data
}
