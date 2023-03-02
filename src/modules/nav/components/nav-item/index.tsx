import { useState } from 'react'
import { Group, Collapse, ThemeIcon, UnstyledButton, Text, Flex } from '@mantine/core'
import useStyles from './styles'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { NavLink, useLocation } from 'react-router-dom'
import { NavItemType } from '../../../../types/global'
import { useAuth } from '../../../../lib/contexts/auth-context'
import { closeAllModals } from '@mantine/modals'

const NavItem: React.FC<NavItemType> = ({ icon: Icon, label, links, url }) => {
   const { classes, theme, cx } = useStyles()
   const { closeNavigation } = useAuth()
   const hasLinks = Array.isArray(links)
   const [opened, setOpened] = useState(false)
   const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft
   const { pathname } = useLocation()
   const isActiveLink = url === pathname

   const handleClickLink = () => {
      closeNavigation()
      closeAllModals()
   }

   const items = (hasLinks ? links : []).map((link) => (
      <NavLink
         className={({ isActive }) => cx(classes.link, { [classes.linkActive]: isActive })}
         to={link.url}
         key={link.label}
         onClick={handleClickLink}
      >
         {link.label}
      </NavLink>
   ))

   if (hasLinks) {
      return (
         <>
            <UnstyledButton
               onClick={() => setOpened((o) => !o)}
               className={cx(classes.control, { [classes.linkActive]: isActiveLink })}
            >
               <Group position="apart" spacing={0}>
                  <Flex align="center">
                     <ThemeIcon variant={`${isActiveLink ? 'filled' : 'light'}`} size={30}>
                        <Icon size={18} />
                     </ThemeIcon>
                     <Text ml="md">{label}</Text>
                  </Flex>
                  <ChevronIcon
                     className={classes.chevron}
                     size={14}
                     stroke={1.5}
                     style={{
                        transform: opened ? `rotate(90deg)` : 'none',
                     }}
                  />
               </Group>
            </UnstyledButton>
            <Collapse in={opened}>{items}</Collapse>
         </>
      )
   }

   return (
      <NavLink
         to={url as string}
         onClick={handleClickLink}
         className={cx(classes.control, { [classes.linkActive]: isActiveLink })}
      >
         <Flex align="center">
            <ThemeIcon variant={`${isActiveLink ? 'filled' : 'light'}`} size={30}>
               <Icon size={18} />
            </ThemeIcon>
            <Text ml="md">{label}</Text>
         </Flex>
      </NavLink>
   )
}

export default NavItem
