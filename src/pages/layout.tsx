import { Box, Flex, Footer, Paper, Text } from '@mantine/core'
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
                     marginLeft: DRAWER_WIDTH,
                  },
               })}
            >
               <Paper
                  withBorder
                  radius="md"
                  p={{ base: 'xs', xs: 'md' }}
                  style={{ minHeight: `calc(100vh - 100px)` }}
               >
                  <Outlet />
               </Paper>
               <Box
                  style={{
                     width: '100%',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
                  py="lg"
               >
                  <Box>
                     <Text fw="bold" color="dimmed" size="sm">
                        Created By Idea Fresh
                     </Text>
                  </Box>
               </Box>
            </Box>
         </Flex>
      </Flex>
   )
}
