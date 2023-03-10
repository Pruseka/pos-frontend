import { Badge, Box, Button, Flex, NumberInput, Select, Text, TextInput } from '@mantine/core'
import { isInRange, isNotEmpty, useForm } from '@mantine/form'
import { useEffect } from 'react'
import useSWR from 'swr'
import { Item } from '.'
import { CustomerType } from '../../../../../api/customer/queries/getAllCustomers'
import { getAllItems, GetAllItemsResponse } from '../../../../../api/item/queries/getAllItems'
import { INVOICE_FORM_WIDTH } from '../../../../../lib/constants/layout'
import useStyles from './styles'

interface FormValues {
   itemId: string
   code: string
   name: string
   retailPrice: number
   wholesalesPrice: number
   price: number
   qty: number
}

export type invoiceFormItem = Omit<Item, 'netAmount'>
interface Props {
   item: invoiceFormItem | null
   isEditing: boolean
   loading: boolean
   newId: number
   customerType: CustomerType
   updateRow: (values: invoiceFormItem) => void
   addRow: (values: invoiceFormItem) => void
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
   customerType,
}) => {
   const { classes } = useStyles()
   const { data: itemsData, isLoading } = useSWR<GetAllItemsResponse>('/item/all', getAllItems)

   const items =
      itemsData?.data && itemsData.data.length > 0
         ? itemsData?.data.map((item) => ({ label: item.name, value: item.name }))
         : []

   const initialValues = {
      itemId: '',
      code: '',
      name: '',
      retailPrice: 0,
      wholesalesPrice: 0,
      price: 0,
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

   const netAmount = (form.values.price || 0) * (form.values.qty || 0)

   function handleSubmit(values: FormValues) {
      isEditing && item
         ? updateRow({
              ...item,
              ...values,
              price: { retail: values.retailPrice, wholesales: values.wholesalesPrice },
           })
         : addRow({
              no: newId,
              ...values,
              price: { retail: values.retailPrice, wholesales: values.wholesalesPrice },
           })

      //needs to fix(if item exist, the new item is added to existing one)
      form.reset()
   }

   function handleCancelUpdate() {
      form.reset()
      cancelUpdate()
   }

   useEffect(() => {
      if (isEditing && item) {
         // other fields will set automatically because of useEffect
         form.setValues({
            name: item.name,
            qty: item.qty,
         })
      }
   }, [isEditing, item])

   useEffect(() => {
      if (form.values.name && itemsData?.data) {
         const item = itemsData.data.find((item) => item.name === form.values.name)

         form.setValues({
            code: item?.code,
            retailPrice: item?.retailPrice,
            wholesalesPrice: item?.wholesalesPrice,
            price: customerType === CustomerType.RETAIL ? item?.retailPrice : item?.wholesalesPrice,
            itemId: item?.itemId,
         })
      }
   }, [itemsData?.data, form.values.name, customerType])

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
                     Invoice
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
                        classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                        searchable
                        {...form.getInputProps('name')}
                     />
                  </Flex>

                  <Flex align="center" gap="md">
                     <NumberInput
                        label="Price"
                        py="xs"
                        disabled
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label }}
                        step={1}
                        min={0}
                        hideControls
                        rightSection={<Text fz="sm">Ks</Text>}
                        parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                        formatter={(value: any) =>
                           !Number.isNaN(parseFloat(value))
                              ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                              : ''
                        }
                        {...form.getInputProps('price')}
                     />
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
               <Box p="xl" my="md" className={classes.netAmountWrapper}>
                  <Text color="dimmed" size="md" fw="bold">
                     Net Amount: {netAmount.toLocaleString()} Ks
                  </Text>
               </Box>

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
