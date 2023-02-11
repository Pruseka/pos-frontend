import { useState } from 'react'
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton } from '@mantine/core'
import useStyles from './styles'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'

interface NavItemProps {
   icon: Icon
   label: string
   initiallyOpened?: boolean
   links?: { label: string; link: string }[]
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, initiallyOpened, links }) => {
   const { classes, theme } = useStyles()
   const hasLinks = Array.isArray(links)
   const [opened, setOpened] = useState(initiallyOpened || false)
   const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft
   const items = (hasLinks ? links : []).map((link) => (
      <Text<'a'>
         component="a"
         className={classes.link}
         href={link.link}
         key={link.label}
         onClick={(event) => event.preventDefault()}
      >
         {link.label}
      </Text>
   ))

   return (
      <>
         <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
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
