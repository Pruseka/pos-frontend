import useSWR from 'swr'
import { Autocomplete, Box, Button, Flex, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import {
   CustomerType,
   getAllCustomers,
   GetAllCustomersResponse,
} from '../../../../../api/customer/queries/getAllCustomers'
import { InvoiceType } from '../../../../../api/invoice/queries/getInvoicesByDate'
import useStyles from './styles'

interface FormValues {
   customer: string
   customerType: CustomerType
   type: InvoiceType
}
const CustomerForm: React.FC = () => {
   const { classes } = useStyles()
   const { data: customersData } = useSWR<GetAllCustomersResponse>('/customer/all', getAllCustomers)
   const customers =
      customersData?.data && customersData.data.length > 0
         ? customersData?.data.map((customer) => ({ label: customer.name, value: customer.name }))
         : []

   const customerTypes = Object.values(CustomerType).map((type) => ({ label: type, value: type }))
   const invoiceTypes = Object.values(InvoiceType).map((type) => ({ label: type, value: type }))

   const initialValues = {
      customer: '',
      customerType: CustomerType.RETAIL,
      type: InvoiceType.CASH,
   }

   const form = useForm({
      initialValues,
      //   ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   const handleSubmit = (values: FormValues) => {}

   useEffect(() => {
      if (form.values.customer) {
         const customerName = form.values.customer
         const existingCustomer = customersData?.data.find((customer) => customer.name === customerName)

         if (existingCustomer) {
            form.setValues({ customerType: existingCustomer.type })
         }
      }
   }, [form.values.customer])

   return (
      <Box w="100%">
         <Flex p="xl" direction={{ base: 'column', md: 'row' }}>
            <Flex justify="center" align="center" sx={{ flex: 1 / 2 }}>
               <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
                  <Flex direction="column" gap={{ base: 'sm' }} py="md" w="100%">
                     <Autocomplete
                        label="Customer Name"
                        py="xs"
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label }}
                        data={customers}
                        {...form.getInputProps('customer')}
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
                           {...form.getInputProps('type')}
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
