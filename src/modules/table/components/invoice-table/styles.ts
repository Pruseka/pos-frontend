import { createStyles } from '@mantine/core'
export default createStyles((theme) => ({
   label: {
      textTransform: 'capitalize',
   },
   item: {
      textTransform: 'capitalize',
   },
   submitButton: {
      width: '100%',
   },
   title: {
      padding: `${theme.spacing.sm}px ${theme.spacing.xs}px`,
   },
   empty: {
      paddingTop: '6rem',
      color: theme.colors.gray[4],
   },
}))
