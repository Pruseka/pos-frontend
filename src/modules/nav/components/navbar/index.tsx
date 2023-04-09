import { Code, Group, Navbar, Text } from '@mantine/core'
import { DRAWER_WIDTH } from '../../../../lib/constants/layout'
import NavbarBody from '../navbar-body'
import NavbarFooter from '../navbar-footer'
import useStyles from './styles'

const NavBar: React.FC = () => {
   const { classes } = useStyles()

   return (
      <Navbar width={{ md: DRAWER_WIDTH }} p="md" pb={0} zIndex={10}>
         <Navbar.Section className={classes.header}>
            <Group position="apart">
               <Text fw="bold">POS Admin</Text>
            </Group>
         </Navbar.Section>
         <NavbarBody />
         <NavbarFooter />
      </Navbar>
   )
}

export default NavBar
