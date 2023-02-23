import apiClient from '../../instance'

interface Fields {
   secret: string
   name: string
   email: string
   password: string
}

export async function createAdmin(url: string, { fields }: { fields: Fields }) {
   await apiClient.post(url, {
      email: fields.email,
      name: fields.name,
      password: fields.password,
      secret: fields.secret,
   })
}
