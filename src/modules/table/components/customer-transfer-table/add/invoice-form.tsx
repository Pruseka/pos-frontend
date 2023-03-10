import { Badge, Box, Button, Flex, NumberInput, Select, Text, TextInput } from '@mantine/core'
import { isInRange, isNotEmpty, useForm } from '@mantine/form'
import { useEffect } from 'react'
import useSWR from 'swr'
import { Item } from '.'
import { getAllItems, GetAllItemsResponse } from '../../../../../api/item/queries/getAllItems'
import { INVOICE_FORM_WIDTH } from '../../../../../lib/constants/layout'
import useStyles from './styles'

interface FormValues {
   itemId: string
   code: string
   name: string
   qty: number
}

interface Props {
   item: Item | null
   isEditing: boolean
   loading: boolean
   newId: number
   updateRow: (values: Item) => void
   addRow: (values: Item) => void
   cancelUpdate: () => void
}

const InvoiceForm: React.FC<Props> = ({
   item,
   isEditing,
   loading,
   newId,
   updateRow,
   addRow,
   cancelUpdate,
}) => {
   const { classes } = useStyles()
   const { data: itemsData } = useSWR<GetAllItemsResponse>('/item/all', getAllItems)

   const items =
      itemsData?.data && itemsData.data.length > 0
         ? itemsData?.data.map((item) => ({ label: item.name, value: item.name }))
         : []

   const initialValues = {
      itemId: '',
      code: '',
      name: '',
      qty: 0,
   }
   const addValidate = {
      name: isNotEmpty('Name must be filled'),
      qty: isInRange({ min: 1 }, 'Quantity must be at least 1'),
   }
   const updateValidate = {
      name: isNotEmpty('Name must be filled'),
      qty: isInRange({ min: 1 }, 'Quantity must be at least 1'),
   }

   const form = useForm({
      initialValues,
      ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   function handleSubmit(values: FormValues) {
      isEditing && item ? updateRow({ ...item, ...values }) : addRow({ no: newId, ...values })
      //needs to fix(if item exist, the new item is added to existing one)
      form.reset()
   }

   function handleCancelUpdate() {
      form.reset()
      cancelUpdate()
   }

   useEffect(() => {
      if (isEditing && item) {
         form.setValues({
            name: item.name,
            qty: item.qty,
         })
      }
   }, [isEditing, item])

   useEffect(() => {
      if (form.values.name) {
         const item = itemsData?.data.find((item) => item.name === form.values.name)
         form.setValues({
            code: item?.code,
            itemId: item?.itemId,
         })
      }
   }, [itemsData?.data, form.values.name])

   useEffect(() => {
      if (!item) {
         form.reset()
      }
   }, [item])

   return (
      <Box
         w="100%"
         sx={(theme) => ({
            [theme.fn.largerThan('md')]: {
               maxWidth: INVOICE_FORM_WIDTH,
            },
         })}
      >
         <Flex p="xl" justify="center" align="center" className={classes.formContainer}>
            <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
               <Flex align="center" gap="sm">
                  <Text size="xl" fw="bold">
                     Transfer Item
                  </Text>
                  {isEditing && <Badge>Editing</Badge>}
               </Flex>

               <Flex direction="column" gap={{ base: 'sm' }} py="md" w="100%">
                  <Flex align="center" gap="md">
                     <TextInput
                        label="Item Code"
                        disabled
                        py="xs"
                        sx={{ flex: 2 / 5 }}
                        classNames={{ label: classes.label }}
                        {...form.getInputProps('code')}
                     />
                     <Select
                        label="Item Name"
                        data={items}
                        py="xs"
                        sx={{ flex: 1 }}
                        searchable
                        classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                        {...form.getInputProps('name')}
                     />
                  </Flex>

                  <Flex align="center" gap="md">
                     <NumberInput
                        label="Qty"
                        py="xs"
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label }}
                        step={1}
                        min={0}
                        {...form.getInputProps('qty')}
                     />
                  </Flex>
               </Flex>

               <Flex justify="flex-end" py="xl" gap="sm">
                  {isEditing && (
                     <Button variant="light" onClick={handleCancelUpdate} className={classes.actionButton}>
                        Cancel
                     </Button>
                  )}
                  <Button type="submit" loading={loading} className={classes.actionButton}>
                     {`${isEditing ? 'Update' : 'Add'}`}
                  </Button>
               </Flex>
            </form>
         </Flex>
      </Box>
   )
}

export default InvoiceForm
