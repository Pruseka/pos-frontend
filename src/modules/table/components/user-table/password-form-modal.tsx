import { Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import useStyles from './styles'
import { Item } from './table'

interface FormValues {
   password: string
}

interface Props {
   item: Item | null
   loading: boolean
   updatePassword: <T extends { [key: string]: unknown }>(values: T) => Promise<void>
}

const PasswordFormModal: React.FC<Props> = ({ item, loading, updatePassword }) => {
   const { classes } = useStyles()

   const initialValues = {
      password: '',
   }

   const validate = {
      password: isNotEmpty('Password must be filled'),
   }

   const form = useForm<FormValues>({
      initialValues,
      validate,
   })

   async function handleSubmit(values: FormValues) {
      await updatePassword({ ...item, ...values })
   }

   return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
         <Flex direction="column" gap={{ base: 'sm' }} py="md">
            <PasswordInput
               label="Password"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('password')}
            />
         </Flex>
         <Button type="submit" loading={loading} className={classes.submitButton}>
            Submit
         </Button>
      </form>
   )
}

export default PasswordFormModal
