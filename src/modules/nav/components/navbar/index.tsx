import { Navbar } from '@mantine/core'
import { DRAWER_WIDTH } from '../../../../lib/constants/layout'
import NavbarBody from '../navbar-body'
import NavbarFooter from '../navbar-footer'

const NavBar: React.FC = () => {
   return (
      <Navbar width={{ md: DRAWER_WIDTH }} p="md" pb={0} zIndex={10}>
         <NavbarBody />
         <NavbarFooter />
      </Navbar>
   )
}

export default NavBar
