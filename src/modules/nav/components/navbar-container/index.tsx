import { Box, Burger, Drawer } from '@mantine/core'
import NavBar from '../navbar'
import { useState } from 'react'
import useStyles from './styles'

const NavBarContainer: React.FC = () => {
   const [openedDrawer, setOpenedDrawer] = useState(false)
   const [openedBurger, setOpenedBurger] = useState(false)
   const title = openedBurger ? 'Close Navigation' : 'Open Navigation'
   const { classes } = useStyles()

   /**
    * @context
    * need to add useContext
    * to close drawer after selecting navlinks
    */

   const handleOpenNavigation = () => {
      setOpenedBurger(true)
      setOpenedDrawer(true)
   }

   const handleCloseNavigation = () => {
      setOpenedBurger(false)
      setOpenedDrawer(false)
   }

   return (
      <>
         <Box className={classes.container}>
            <NavBar />
         </Box>
         <Box className={classes.mobileContainer}>
            <Burger
               opened={openedBurger}
               onClick={handleOpenNavigation}
               title={title}
               hidden={openedBurger}
            />
            <Drawer
               opened={openedDrawer}
               onClose={handleCloseNavigation}
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
