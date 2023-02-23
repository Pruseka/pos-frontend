import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useNavigate } from 'react-router-dom'
import { loginMutation } from '../../../api/user/mutations/login'
import LoginForm from '../components/login-form'
import { LOGIN } from '../../../api/urls'
import { useAuth } from '../../../lib/contexts/auth-context'
import type { Credentials } from '../../../api/user/mutations/login'

const LoginTemplate: React.FC = () => {
   const { trigger, isMutating, reset } = useSWRMutation(LOGIN, loginMutation)
   const navigate = useNavigate()
   const { signIn, user } = useAuth()

   useEffect(() => {
      if (user) {
         navigate('/', { replace: true })
         reset()
      }
   }, [user, navigate, reset])

   const handleSubmit = async (values: Credentials) => {
      const data = await trigger({ email: values.email, password: values.password })
      const token = data?.data.data.token
      signIn(token)
   }

   return <LoginForm handleSubmit={handleSubmit} loading={isMutating} />
}

export default LoginTemplate
