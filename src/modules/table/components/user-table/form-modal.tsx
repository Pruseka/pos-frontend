import { Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import useStyles from './styles'
import { Item } from './table'

interface FormValues {
   name: string
   email: string
   password?: string
}

interface Props {
   item: Item | null
   isEditing: boolean
   loading: boolean
   updateRow: <T extends { [key: string]: unknown }>(values: T) => Promise<void>
   addRow: <T extends { [key: string]: unknown }>(values: T) => Promise<void>
}

const FormModal: React.FC<Props> = ({ item, isEditing, loading, updateRow, addRow }) => {
   const { classes } = useStyles()

   const initialValues =
      isEditing && item
         ? {
              name: item.name!,
              email: item.email!,
           }
         : {
              name: '',
              email: '',
              password: '',
           }

   const addValidate = {
      name: isNotEmpty('Name must be filled'),
      email: isNotEmpty('Email must be filled'),
   }
   const updateValidate = {}

   const form = useForm<FormValues>({
      initialValues,
      ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   async function handleSubmit(values: FormValues) {
      isEditing
         ? await updateRow({
              ...item,
              ...values,
           })
         : await addRow({ ...values })
   }

   return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
         <Flex direction="column" gap={{ base: 'sm' }} py="md">
            <TextInput
               label="Name"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('name')}
            />

            <TextInput
               label="Email"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('email')}
            />
            {!isEditing && (
               <PasswordInput
                  label="Password"
                  py="xs"
                  classNames={{ label: classes.label }}
                  {...form.getInputProps('password')}
               />
            )}
         </Flex>
         <Button type="submit" loading={loading} className={classes.submitButton}>
            Submit
         </Button>
      </form>
   )
}

export default FormModal

// const inputs = Object.entries(forms).map(([k, v]) => {
//     switch (typeof v.value) {
//        case 'string':
//           return (
//              <TextInput
//                 key={k}
//                 label={k}
//                 py="xs"
//                 classNames={{ label: classes.label }}
//                 {...form.getInputProps(k)}
//              />
//           )
//        case 'number':
//           return (
//              <NumberInput
//                 key={k}
//                 label={k}
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 min={10}
//                 max={100}
//                 py="xs"
//                 classNames={{ label: classes.label }}
//                 {...form.getInputProps(k)}
//              />
//           )
//        case 'object':
//           if (Array.isArray(v.value)) {
//              return (
//                 <Select
//                    key={k}
//                    label={v.title}
//                    data={v.value}
//                    py="xs"
//                    classNames={{ label: classes.label, item: classes.label, input: classes.label }}
//                    {...form.getInputProps(k, { type: 'input' })}
//                 />
//              )
//           }
//     }
//  })
