import { Burger, Container, Header, Text } from '@mantine/core'
import { useAuth } from '../../../../lib/contexts/auth-context'
import useStyles from './styles'

const NavigationHeader = () => {
   const { openNavigation, openedBurger, user } = useAuth()

   const { classes } = useStyles()

   return (
      <Header height={60} className={classes.root}>
         <Container className={classes.header} size="xl">
            <Burger opened={openedBurger} onClick={openNavigation} className={classes.burger} size="md" />
            <Text>{`${user?.name} (${user?.role})`}</Text>
         </Container>
      </Header>
   )
}

export default NavigationHeader
