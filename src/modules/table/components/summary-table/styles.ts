import { createStyles } from '@mantine/core'
export default createStyles((theme) => ({
   card: {
      backgroundColor: theme.colors.gray[0],
      padding: theme.spacing.xl,
      border: `1px solid ${theme.colors.gray[2]}`,
      borderRadius: theme.radius.md,
   },

   title: {
      padding: `${theme.spacing.xl}px ${theme.spacing.md}px`,
   },
   netAmountWrapper: {
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.gray[0],
      border: `1px solid ${theme.colors.gray[3]}`,
   },
}))
