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
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
         display: 'none',
      },
   },
   mobileContainer: mqOnMobile(theme),
   drawer: mqOnMobile(theme),
}))
