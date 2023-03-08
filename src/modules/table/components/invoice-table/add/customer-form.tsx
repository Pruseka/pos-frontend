import { Autocomplete, Box, Button, Flex, Select } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useEffect } from 'react'
import useSWR from 'swr'
import {
   CustomerType,
   getAllCustomers,
   GetAllCustomersResponse,
} from '../../../../../api/customer/queries/getAllCustomers'
import { PaymentType } from '../../../../../api/invoice/queries/getInvoicesByDate'
import useStyles from './styles'

export interface FormValues {
   customer: string
   customerType: CustomerType
   type: PaymentType
}

interface Props {
   submitForm: (values: FormValues) => Promise<void>
}

const CustomerForm: React.FC<Props> = ({ submitForm }) => {
   const { classes } = useStyles()
   const { data: customersData } = useSWR<GetAllCustomersResponse>('/customer/all', getAllCustomers)
   const customers =
      customersData?.data && customersData.data.length > 0
         ? customersData?.data.map((customer) => ({ label: customer.name, value: customer.name }))
         : []

   const customerTypes = Object.values(CustomerType).map((type) => ({ label: type, value: type }))
   const paymentTypes = Object.values(PaymentType).map((type) => ({ label: type, value: type }))

   const initialValues = {
      customer: '',
      customerType: CustomerType.RETAIL,
      type: PaymentType.CASH,
   }

   const form = useForm({
      initialValues,
      validate: {
         customer: isNotEmpty('Customer Name must be filled'),
      },
      //   ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   const handleSubmit = async (values: FormValues) => {
      await submitForm(values)
   }

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
         <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
            <Flex p="xl" direction={{ base: 'column', md: 'row' }}>
               <Flex justify="center" align="center" sx={{ flex: 1 / 2 }}>
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
                           data={paymentTypes}
                           py="xs"
                           sx={{ flex: 1 }}
                           classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                           {...form.getInputProps('type')}
                        />
                     </Flex>
                  </Flex>
               </Flex>
               <Flex py="md" sx={{ flex: 1 }} justify="flex-end" align="flex-end">
                  <Flex gap="md">
                     <Button variant="outline" className={classes.actionButton}>
                        Discard
                     </Button>
                     <Button className={classes.actionButton} type="submit">
                        Save
                     </Button>
                  </Flex>
               </Flex>
            </Flex>
         </form>
      </Box>
   )
}

export default CustomerForm
