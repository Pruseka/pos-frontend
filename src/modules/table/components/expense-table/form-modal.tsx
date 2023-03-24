import { Button, Flex, NumberInput, Select, Text, Textarea, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { Item } from './table'
import useStyles from './styles'
import { CustomerType } from '../../../../api/customer/queries/getAllCustomers'

interface Props {
   item: Item | null
   isEditing: boolean
   loading: boolean
   updateRow: <T extends { [key: string]: unknown }>(values: T) => Promise<void>
   addRow: <T extends { [key: string]: unknown }>(values: T) => Promise<void>
}

const FormModal: React.FC<Props> = ({ item, isEditing, loading, updateRow, addRow }) => {
   const { classes } = useStyles()
   const customerTypes = Object.values(CustomerType).map((type) => ({ label: type, value: type }))

   const initialValues = isEditing
      ? {
           title: item?.title,
           description: item?.description,
           amount: item?.amount,
        }
      : {
           title: '',
           description: '',
           amount: 0,
        }

   const addValidate = {
      title: isNotEmpty('Name must be filled'),
   }
   const updateValidate = {
      title: isNotEmpty('Type must be filled'),
   }

   const form = useForm({
      initialValues,
      ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   async function handleSubmit<T extends { [key: string]: unknown }>(values: T) {
      isEditing ? await updateRow({ ...item, ...values }) : await addRow({ ...values })
   }

   return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
         <Flex direction="column" gap={{ base: 'sm' }} py="md">
            <TextInput
               label="Title"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('title')}
            />

            <NumberInput
               label="Amount"
               py="xs"
               classNames={{ label: classes.label }}
               hideControls
               rightSection={<Text fz="sm">Ks</Text>}
               parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
               formatter={(value: any) =>
                  !Number.isNaN(parseFloat(value))
                     ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                     : ''
               }
               {...form.getInputProps('amount')}
            />
            <Textarea
               label="Description"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('description')}
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
