import { INVOICE_FORM_WIDTH } from './../../../../../lib/constants/layout'
import { createStyles } from '@mantine/core'
export default createStyles((theme) => ({
   container: {
      backgroundColor: theme.colors.gray[1],
   },
   itemsWrapper: {
      backgroundColor: theme.white,
      border: `1px solid ${theme.colors.gray[4]}`,
      width: '100%',
      [theme.fn.largerThan('md')]: {
         width: `calc(100% - ${INVOICE_FORM_WIDTH}px)`,
      },
   },
   label: {
      textTransform: 'capitalize',
   },
   item: {
      textTransform: 'capitalize',
   },

   title: {
      padding: `${theme.spacing.sm}px ${theme.spacing.xs}px`,
   },
   empty: {
      width: '100%',
      paddingTop: '6rem',
      color: theme.colors.gray[4],
   },
   formContainer: {
      borderRadius: theme.radius.sm,
      border: `1px solid ${theme.colors.gray[4]}`,
      backgroundColor: theme.white,
   },
   form: {
      width: '100%',
   },
   netAmountWrapper: {
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.gray[0],
      border: `1px solid ${theme.colors.gray[4]}`,
   },
   actionButton: {
      width: 120,
      [theme.fn.smallerThan('xs')]: {
         width: 100,
      },
   },
   backLink: {
      fontWeight: 500,
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: theme.colors.gray[7],

      '&:hover': {
         textDecoration: 'underline',
      },
   },
}))
