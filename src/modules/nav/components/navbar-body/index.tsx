import { Box, Navbar, ScrollArea } from '@mantine/core'
import { JsxElement } from 'typescript'
import { UserRole } from '../../../../api/user/mutations/createUser'
import {
   ADMIN_NAV_LINKS,
   SALES_ADMIN_NAV_LINKS,
   VAN_SALES_NAV_LINKS,
} from '../../../../lib/constants/nav-links'
import { useAuth } from '../../../../lib/contexts/auth-context'
import NavItem from '../nav-item'
import useStyles from './styles'

const NavbarBody: React.FC = () => {
   const { classes } = useStyles()
   const { user } = useAuth()

   let navItems: JSX.Element[] | undefined

   switch (user?.role) {
      case UserRole.ADMIN:
         navItems = ADMIN_NAV_LINKS.map((item) => <NavItem {...item} key={item.label} />)
         break
      case UserRole.SALES_ADMIN:
         navItems = SALES_ADMIN_NAV_LINKS.map((item) => <NavItem {...item} key={item.label} />)
         break
      case UserRole.VAN_SALES:
         navItems = VAN_SALES_NAV_LINKS.map((item) => <NavItem {...item} key={item.label} />)
   }

   return (
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
         <Box className={classes.linksInner}>{navItems}</Box>
      </Navbar.Section>
   )
}

export default NavbarBody
