import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/contexts/auth-context'

export default function Root() {
   const navigate = useNavigate()
   const { user, token } = useAuth()

   useEffect(() => {
      if (!user && !token) {
         navigate('/login', { replace: true })
      }
   }, [navigate, user, token])

   if (!user) return null
   return <Outlet />
}
