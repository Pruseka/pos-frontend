import { Navbar, Group, Code, ScrollArea, Drawer } from '@mantine/core'
import { useState } from 'react'
import { NAV_LINKS } from '../../../../lib/constants/nav-links'
import NavItem from '../nav-item'
import useStyles from './styles'

export function NavbarNested() {
   const { classes } = useStyles()
   const navItems = NAV_LINKS.map((item) => <NavItem {...item} key={item.label} />)
   const [opened, setOpened] = useState(true)

   return (
      <>
         <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
            {/* need to split file navitems to reuse  */}
            <Navbar.Section className={classes.header}>
               <Group position="apart">
                  <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
               </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links} component={ScrollArea}>
               <div className={classes.linksInner}>{navItems}</div>
            </Navbar.Section>
         </Navbar>
         <Drawer></Drawer>
      </>
   )
}
