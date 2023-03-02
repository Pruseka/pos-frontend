import { Button, Flex, Select, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { Item } from './table'
import useStyles from './styles'
import { CustomerType } from '../../../../api/customer/queries/getAllCustomers'

interface Props {
   item: Item | null
   isEditing: boolean
   loading: boolean
   updateRow: <T extends { [key: string]: unknown }>(values: T) => void
   addRow: <T extends { [key: string]: unknown }>(values: T) => void
}

const FormModal: React.FC<Props> = ({ item, isEditing, loading, updateRow, addRow }) => {
   const { classes } = useStyles()

   const customerTypes = Object.values(CustomerType).map((type) => ({ label: type, value: type }))

   const initialValues = isEditing
      ? {
           code: item?.code,
           name: item?.name,
           type: item?.type,
           phone: item?.phone,
           address: item?.address,
        }
      : {
           code: '',
           name: '',
           type: '',
           phone: '',
           address: '',
        }
   const addValidate = {
      name: isNotEmpty('Name must be filled'),
      code: isNotEmpty('Code must be filled'),
      type: isNotEmpty('Type must be filled'),
   }
   const updateValidate = {
      type: isNotEmpty('Type must be filled'),
   }

   const form = useForm({
      initialValues,
      ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   function handleSubmit<T extends { [key: string]: unknown }>(values: T) {
      isEditing ? updateRow({ ...item, ...values }) : addRow({ ...values })
   }

   return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
         <Flex direction="column" gap={{ base: 'sm' }} py="md">
            <TextInput
               label="Code"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('code')}
            />
            <TextInput
               label="Name"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('name')}
            />

            <Select
               label="Type"
               data={customerTypes}
               py="xs"
               classNames={{ label: classes.label, item: classes.label, input: classes.label }}
               {...form.getInputProps('type')}
            />
            <TextInput
               label="Phone"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('phone')}
            />
            <TextInput
               label="Name"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('address')}
            />
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
