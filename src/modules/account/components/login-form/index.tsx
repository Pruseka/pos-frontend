import { TextInput, PasswordInput, Anchor, Paper, Title, Container, Button } from '@mantine/core'
import { IconAt, IconLock, IconLogin } from '@tabler/icons-react'
import { useForm, isEmail, hasLength } from '@mantine/form'
import type { Credentials } from '../../../../api/user/mutations/login'
import useStyles from './styles'

interface Props {
   handleSubmit: (values: Credentials) => void
   loading: boolean
}

const LoginForm: React.FC<Props> = ({ handleSubmit, loading }) => {
   const { classes } = useStyles()
   const form = useForm({
      initialValues: {
         email: '',
         password: '',
      },

      validate: {
         email: isEmail('Invalid Email'),
         password: hasLength({ min: 4, max: 16 }, 'Passwords must be at least 4 characters long'),
      },
   })

   return (
      <Container size={420} my={40}>
         <Title align="center" className={classes.formTitle}>
            Welcome back!
         </Title>

         <form onSubmit={form.onSubmit(handleSubmit)}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
               <TextInput
                  icon={<IconAt size={16} />}
                  label="Email"
                  placeholder="you@email.com"
                  required
                  {...form.getInputProps('email')}
               />
               <PasswordInput
                  icon={<IconLock size={16} />}
                  label="Password"
                  placeholder="Your password"
                  required
                  mt="md"
                  {...form.getInputProps('password')}
               />
               <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                  Forgot password?
               </Anchor>
               <Button leftIcon={<IconLogin size={16} />} fullWidth mt="xl" type="submit" loading={loading}>
                  Sign in
               </Button>
            </Paper>
         </form>
      </Container>
   )
}

export default LoginForm
