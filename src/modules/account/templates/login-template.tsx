import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useNavigate } from 'react-router-dom'
import { loginMutation } from '../../../api/user/mutations/login'
import LoginForm from '../components/login-form'
import { LOGIN } from '../../../api/urls'
import { useAuth } from '../../../lib/contexts/auth-context'
import type { Credentials } from '../../../api/user/mutations/login'
import { STATUS } from '../../../lib/constants/status'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { MESSAGES } from '../../../lib/constants/message'

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
      await trigger(
         { email: values.email, password: values.password },
         {
            onSuccess: (data) => {
               const token = data?.data.data.token
               if (token) {
                  signIn(token)
                  showNotification({
                     message: MESSAGES.LOGIN_SUCCESS,
                     id: 'login-success',
                     icon: <IconCheck />,
                     color: 'teal',
                  })
               }
            },
         }
      )
   }

   return <LoginForm handleSubmit={handleSubmit} loading={isMutating} />
}

export default LoginTemplate
