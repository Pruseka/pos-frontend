import { Flex } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Navigation from '../modules/nav/templates/nav'
import { useEffect } from 'react'
import { useAuth } from '../lib/contexts/auth-context'

export default function Root() {
   const navigate = useNavigate()
   const { user, token } = useAuth()

   // useEffect(() => {
   //    if (!user && !token) {
   //       navigate('/login', { replace: true })
   //    }
   // }, [navigate, user, token])

   // if (!user) return null

   return (
      <Flex direction={{ base: 'row' }} gap={{ base: 'md' }} justify={{ base: 'left' }}>
         <Navigation />
         <Outlet />
      </Flex>
   )
}
