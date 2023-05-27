import { Autocomplete, Box, Button, Flex, Select, Text } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { openConfirmModal } from '@mantine/modals'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import {
   CustomerType,
   getAllCustomers,
   GetAllCustomersResponse,
} from '../../../../../api/customer/queries/getAllCustomers'
import { PaymentType } from '../../../../../api/invoice/queries/getInvoicesByDate'
import useStyles from './styles'
import { useAuth } from '../../../../../lib/contexts/auth-context'
import { UserRole } from '../../../../../api/user/mutations/createUser'

export interface FormValues {
   customer: string
   type: PaymentType
}

interface Props {
   customerType: CustomerType
   disabledSaveButton: boolean
   submitForm: (values: FormValues) => Promise<void>
   setCustomerType: React.Dispatch<React.SetStateAction<CustomerType>>
}

const CustomerForm: React.FC<Props> = ({ submitForm, customerType, setCustomerType, disabledSaveButton }) => {
   const { user } = useAuth()
   const { classes } = useStyles()
   const navigate = useNavigate()
   const { data: customersData } = useSWR<GetAllCustomersResponse>('/customer/all', getAllCustomers)
   const customers =
      customersData?.data && customersData.data.length > 0
         ? customersData?.data.map((customer) => ({ label: customer.name, value: customer.name }))
         : []

   const customerTypes = Object.values(CustomerType).map((type) => ({ label: type, value: type }))
   const paymentTypes = Object.values(PaymentType)
      .filter((type) => !(user?.role !== UserRole.ADMIN && type === PaymentType.RETURN))
      .map((type) => ({ label: type, value: type }))

   const initialValues = {
      customer: '',
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

   const handleDiscard = () => {
      openConfirmModal({
         title: 'Are you sure want to discard?',
         centered: true,
         labels: { confirm: 'Discard Changes', cancel: 'Cancel Discard' },
         confirmProps: { color: 'red' },
         onCancel: () => console.log('Cancel'),
         onConfirm: () => navigate('/'),
      })
   }

   useEffect(() => {
      if (form.values.customer) {
         const customerName = form.values.customer
         const existingCustomer = customersData?.data.find((customer) => customer.name === customerName)

         if (existingCustomer) {
            setCustomerType(existingCustomer.type)
         }
      }
   }, [customersData?.data, form.values.customer, setCustomerType])

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
                           value={customerType}
                           onChange={setCustomerType as any}
                           py="xs"
                           sx={{ flex: 1 }}
                           classNames={{ label: classes.label, item: classes.label, input: classes.label }}
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
                     <Button variant="outline" className={classes.actionButton} onClick={handleDiscard}>
                        Discard
                     </Button>
                     <Button className={classes.actionButton} type="submit" disabled={disabledSaveButton}>
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
