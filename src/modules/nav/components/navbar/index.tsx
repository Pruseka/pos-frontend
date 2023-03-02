import { Code, Group, Navbar } from '@mantine/core'
import { DRAWER_WIDTH } from '../../../../lib/constants/layout'
import NavbarBody from '../navbar-body'
import NavbarFooter from '../navbar-footer'
import useStyles from './styles'

const NavBar: React.FC = () => {
   const { classes } = useStyles()

   return (
      <Navbar width={{ sm: DRAWER_WIDTH }} p="md" pb={0} zIndex={10}>
         {/* need to split file navitems to reuse  */}
         <Navbar.Section className={classes.header}>
            <Group position="apart">
               <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
            </Group>
         </Navbar.Section>
         <NavbarBody />
         <NavbarFooter />
      </Navbar>
   )
}

export default NavBar
