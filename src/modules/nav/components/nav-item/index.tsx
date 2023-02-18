import { useState } from 'react'
import { Group, Box, Collapse, ThemeIcon, UnstyledButton } from '@mantine/core'
import useStyles from './styles'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useNavigate, NavLink } from 'react-router-dom'
import { NavItemType } from '../../../../types/global'

const NavItem: React.FC<NavItemType> = ({ icon: Icon, label, links, url }) => {
   const { classes, theme } = useStyles()
   const hasLinks = Array.isArray(links)
   const [opened, setOpened] = useState(false)
   const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft
   const navigate = useNavigate()
   const items = (hasLinks ? links : []).map((link) => (
      // need to add active state
      <NavLink className={classes.link} to={link.url} key={link.label}>
         {link.label}
      </NavLink>
   ))

   const handleNavigate = () => {
      setOpened((o) => !o)
      if (!hasLinks) {
         navigate(url as string)
      }
   }

   return (
      <>
         <UnstyledButton onClick={handleNavigate} className={classes.control}>
            <Group position="apart" spacing={0}>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThemeIcon variant="light" size={30}>
                     <Icon size={18} />
                  </ThemeIcon>
                  <Box ml="md">{label}</Box>
               </Box>
               {hasLinks && (
                  <ChevronIcon
                     className={classes.chevron}
                     size={14}
                     stroke={1.5}
                     style={{
                        transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                     }}
                  />
               )}
            </Group>
         </UnstyledButton>
         {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
      </>
   )
}

export default NavItem
