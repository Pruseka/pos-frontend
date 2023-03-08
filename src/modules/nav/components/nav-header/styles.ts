import { createStyles } from '@mantine/core'
export default createStyles((theme) => ({
   root: {
      position: 'relative',
      zIndex: 1,
   },

   header: {
      display: 'flex',
      alignItems: 'center',

      height: '100%',
      justifyContent: 'space-between',
      [theme.fn.largerThan('md')]: {
         justifyContent: 'flex-end',
      },
   },

   burger: {
      [theme.fn.largerThan('md')]: {
         display: 'none',
      },
   },
}))
