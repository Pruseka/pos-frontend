import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
   links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
   },

   linksInner: {
      padding: `${theme.spacing.xl}px ${theme.spacing.sm}px`,
   },
}))
