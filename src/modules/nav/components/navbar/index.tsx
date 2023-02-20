import { Code, Group, Navbar } from '@mantine/core'
import NavbarBody from '../navbar-body'
import useStyles from './styles'

const NavBar: React.FC = () => {
   const { classes } = useStyles()

   return (
      <Navbar width={{ sm: 300 }} p="md" pb={0}>
         {/* need to split file navitems to reuse  */}
         <Navbar.Section className={classes.header}>
            <Group position="apart">
               <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
            </Group>
         </Navbar.Section>

         <NavbarBody />
      </Navbar>
   )
}

export default NavBar
