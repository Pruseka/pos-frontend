import { createStyles, MantineTheme } from '@mantine/core'

const mqOnMobile = (theme: MantineTheme) => ({
   display: 'flex',
   [theme.fn.largerThan('md')]: {
      display: 'none',
   },
})

export default createStyles((theme) => ({
   container: {
      display: 'none',
      position: 'fixed',
      flex: 1,
      [theme.fn.largerThan('md')]: {
         display: 'flex',
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
