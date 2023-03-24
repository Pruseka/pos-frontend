import apiClient from '../../instance'

export enum UserRole {
   ADMIN = 'Admin',
   VAN_SALES = 'Van Sales',
   SALES_ADMIN = 'Sales Admin',
}

export interface Args {
   name: string
   email: string
   password: string
   role: UserRole
}

export async function createUserMutation(
   url: string,
   { arg: { name, email, password, role } }: Readonly<{ arg: Args }>
) {
   return await apiClient.post(url, {
      name,
      email,
      password,
      role,
   })
}
