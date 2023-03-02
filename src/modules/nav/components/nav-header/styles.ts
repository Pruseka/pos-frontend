import { createStyles } from '@mantine/core'
export default createStyles((theme) => ({
   root: {
      position: 'relative',
      zIndex: 1,
   },

   header: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',

      height: '100%',
      [theme.fn.smallerThan('sm')]: {
         justifyContent: 'space-between',
      },
   },

   burger: {
      [theme.fn.largerThan('sm')]: {
         display: 'none',
      },
   },
}))
