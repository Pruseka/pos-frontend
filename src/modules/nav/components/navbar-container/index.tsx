import { Box, Burger, Drawer } from '@mantine/core'
import NavBar from '../navbar'
import useStyles from './styles'
import { useAuth } from '../../../../lib/contexts/auth-context'

const NavBarContainer: React.FC = () => {
   const { openedDrawer, closeNavigation } = useAuth()
   const { classes } = useStyles()

   return (
      <>
         <Box className={classes.container}>
            <NavBar />
         </Box>
         <Box className={classes.mobileContainer}>
            <Drawer
               opened={openedDrawer}
               onClose={closeNavigation}
               className={classes.drawer}
               styles={(theme) => ({
                  drawer: { flexDirection: 'column' },
                  // still needs to fix
                  /**
                   * @header
                   * makes body visible overflow from the box
                   */
                  header: { padding: theme.spacing.xs, fontWeight: 600, marginBottom: 0, display: 'none' },
               })}
               title="Menu"
            >
               <NavBar />
            </Drawer>
         </Box>
      </>
   )
}

export default NavBarContainer
