import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
   links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
   },

   linksInner: {
      paddingTop: theme.spacing.xl,
      //   paddingBottom: 100
      paddingBottom: theme.spacing.xl,
   },
}))
