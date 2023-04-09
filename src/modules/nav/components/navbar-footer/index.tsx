import { Box, Flex, Navbar, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { closeAllModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconLogout } from '@tabler/icons-react'
import { MESSAGES } from '../../../../lib/constants/message'
import { useAuth } from '../../../../lib/contexts/auth-context'
import useStyles from './styles'

const NavbarFooter: React.FC = () => {
   const { signOut } = useAuth()
   const { classes } = useStyles()

   const handleSiginOut = () => {
      signOut()
      closeAllModals()
      showNotification({
         message: MESSAGES.LOGOUT_SUCCESS,
         icon: <IconCheck />,
         color: 'teal',
         id: 'logout-success',
      })
   }

   return (
      <Navbar.Section className={classes.footer}>
         <UnstyledButton className={classes.control} onClick={handleSiginOut}>
            <Flex align="center">
               <ThemeIcon color="red" variant="light" size={30}>
                  <IconLogout size={18} />
               </ThemeIcon>
               <Text ml="md">Logout</Text>
            </Flex>
         </UnstyledButton>
      </Navbar.Section>
   )
}

export default NavbarFooter
