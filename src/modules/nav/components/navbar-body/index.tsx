import { Box, Navbar, ScrollArea } from '@mantine/core'
import { NAV_LINKS } from '../../../../lib/constants/nav-links'
import NavItem from '../nav-item'
import useStyles from './styles'

const NavbarBody: React.FC = () => {
   const { classes } = useStyles()
   const navItems = NAV_LINKS.map((item) => <NavItem {...item} key={item.label} />)
   return (
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
         <Box className={classes.linksInner}>{navItems}</Box>
      </Navbar.Section>
   )
}

export default NavbarBody
