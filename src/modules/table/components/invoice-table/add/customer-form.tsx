import useSWR from 'swr'
import {
   Badge,
   Box,
   Button,
   Container,
   Divider,
   Flex,
   NumberInput,
   Paper,
   Select,
   Text,
   TextInput,
} from '@mantine/core'
import { isNotEmpty, useForm, isInRange } from '@mantine/form'
import { Item } from '.'
import useStyles from './styles'
import { getAllItems, GetAllItemsResponse } from '../../../../../api/item/queries/getAllItems'
import { useEffect } from 'react'
import { CustomerType } from '../../../../../api/customer/queries/getAllCustomers'
import { InvoiceType } from '../../../../../api/invoice/queries/getInvoicesByDate'

interface FormValues {
   customerName: string
   customerType: CustomerType
   invoiceType: InvoiceType
}

interface Props {
   setCustomerType: React.Dispatch<React.SetStateAction<CustomerType>>
}

const CustomerForm: React.FC<Props> = ({ setCustomerType }) => {
   const { classes } = useStyles()
   //    const { data: itemsData, isLoading } = useSWR<GetAllItemsResponse>('/item/all', getAllItems)

   const customerTypes = Object.values(CustomerType).map((type) => ({ label: type, value: type }))
   const invoiceTypes = Object.values(InvoiceType).map((type) => ({ label: type, value: type }))

   const initialValues = {
      customerName: '',
      customerType: CustomerType.RETAIL,
      invoiceType: InvoiceType.CASH,
   }

   const form = useForm({
      initialValues,
      //   ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   const handleSubmit = (values: FormValues) => {}

   useEffect(() => {
      if (form.values.customerType) {
         console.log(form.values.customerType)
         setCustomerType(form.values.customerType)
      }
   }, [setCustomerType, form.values.customerType])

   return (
      <Box w="100%">
         <Flex p="xl" direction={{ base: 'column', md: 'row' }}>
            <Flex justify="center" align="center" sx={{ flex: 1 / 2 }}>
               <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
                  <Flex direction="column" gap={{ base: 'sm' }} py="md" w="100%">
                     <TextInput
                        label="Customer Name"
                        py="xs"
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label }}
                        {...form.getInputProps('customerName')}
                     />
                     <Flex gap="sm">
                        <Select
                           label="Customer Type"
                           data={customerTypes}
                           py="xs"
                           sx={{ flex: 1 }}
                           classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                           {...form.getInputProps('customerType')}
                        />
                        <Select
                           label="Payment Type"
                           data={invoiceTypes}
                           py="xs"
                           sx={{ flex: 1 }}
                           classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                           {...form.getInputProps('invoiceType')}
                        />
                     </Flex>
                  </Flex>
               </form>
            </Flex>
            <Flex py="md" sx={{ flex: 1 }} justify="flex-end" align="flex-end">
               <Flex gap="md">
                  <Button color="teal" variant="outline" className={classes.actionButton}>
                     Discard
                  </Button>
                  <Button color="teal" className={classes.actionButton}>
                     Save
                  </Button>
               </Flex>
            </Flex>
         </Flex>
      </Box>
   )
}

export default CustomerForm
