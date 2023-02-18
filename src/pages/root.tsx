import { Box, Flex } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import Navigation from '../modules/nav/templates/nav'

export default function Root() {
   return (
      <Flex direction={{ base: 'row' }} gap={{ base: 'md' }} justify={{ base: 'center' }}>
         <Navigation />
         <Box style={{ flex: 1 }}>
            <Outlet />
         </Box>
      </Flex>
   )
}
