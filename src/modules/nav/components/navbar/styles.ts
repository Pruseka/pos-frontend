import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
   navbar: {
      backgroundColor: theme.white,
      paddingBottom: 0,
      display: 'block',
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
         display: 'none',
      },
   },

   mobileNavbar: {
      backgroundColor: theme.white,
      display: 'none',
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
         display: 'block',
      },
   },

   header: {
      padding: theme.spacing.md,
      paddingTop: 0,
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      color: theme.black,
      borderBottom: `1px solid ${theme.colors.gray[3]}`,
   },

   links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
   },

   linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
   },

   footer: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
   },
}))
