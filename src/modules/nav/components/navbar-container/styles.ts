import { createStyles, MantineTheme } from '@mantine/core'

const mqOnMobile = (theme: MantineTheme) => ({
   display: 'none',
   [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: 'flex',
   },
})

export default createStyles((theme) => ({
   container: {
      display: 'flex',
      flex: 1,
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
         display: 'none',
      },
   },
   header: {
      padding: theme.spacing.xs,
      fontWeight: 600,
      marginBottom: 0,
      display: 'none',
   },
   mobileContainer: mqOnMobile(theme),
   drawer: mqOnMobile(theme),
}))
