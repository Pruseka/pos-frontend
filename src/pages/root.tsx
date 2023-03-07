import { Box, Flex, Paper } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Navigation from '../modules/nav/templates/nav'
import { useEffect } from 'react'
import { useAuth } from '../lib/contexts/auth-context'
import NavigationHeader from '../modules/nav/components/nav-header'
import { DRAWER_WIDTH } from '../lib/constants/layout'

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
      <Flex direction="column">
         <NavigationHeader />
         <Flex direction={{ base: 'column', sm: 'row' }}>
            <Navigation />
            <Box
               p={{ base: 'xs', sm: 'md' }}
               sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  width: '100%',
                  [theme.fn.largerThan('sm')]: {
                     width: `calc(100% - ${DRAWER_WIDTH}px)`,
                  },
               })}
            >
               <Paper withBorder radius="md" p={{ base: 'xs', xs: 'md' }}>
                  <Outlet />
               </Paper>
            </Box>
         </Flex>
      </Flex>
   )
}
