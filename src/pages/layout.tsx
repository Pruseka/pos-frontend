import { Box, Flex, Paper } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import Navigation from '../modules/nav/templates/nav'
import NavigationHeader from '../modules/nav/components/nav-header'
import { DRAWER_WIDTH } from '../lib/constants/layout'

export default function Layout() {
   return (
      <Flex direction="column">
         <NavigationHeader />
         <Flex>
            <Navigation />
            <Box
               p={{ base: 'xs', sm: 'md' }}
               sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  width: '100%',
                  [theme.fn.largerThan('md')]: {
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
