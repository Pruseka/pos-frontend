import { Box, Button, Flex, Select } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { openConfirmModal } from '@mantine/modals'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { getAllCustomers, GetAllCustomersResponse } from '../../../../../api/customer/queries/getAllCustomers'
import { CustomerTransferType } from '../../../../../api/customerTransfer/queries/getTransfersByDate'
import { TransferType } from '../../../../../api/transfer/queries/getTransfersByDate'
import { getAllUsers, GetAllUsersResponse } from '../../../../../api/user/queries/getAllUsers'
import useStyles from './styles'

export interface FormValues {
   customerId: string
   type: CustomerTransferType
}

interface Props {
   submitForm: (values: FormValues) => Promise<void>
   disabledSaveButton: boolean
}

const CustomerForm: React.FC<Props> = ({ submitForm, disabledSaveButton }) => {
   const navigate = useNavigate()
   const { classes } = useStyles()
   const { data: customersData } = useSWR<GetAllCustomersResponse>('/customer/all', getAllCustomers)
   const users =
      customersData?.data && customersData.data.length > 0
         ? customersData?.data.map((customer) => ({ label: customer.name, value: customer.customerId }))
         : []

   const customerTransferTypes = Object.values(CustomerTransferType).map((type) => ({
      label: type,
      value: type,
   }))

   const initialValues = {
      customerId: '',
      type: CustomerTransferType.IN,
   }

   const form = useForm<FormValues>({
      initialValues,
      validate: {
         customerId: isNotEmpty('Customer must be filled'),
         type: isNotEmpty('Type must be filled'),
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
         onConfirm: () => navigate('/customer/transfers'),
      })
   }

   return (
      <Box w="100%">
         <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
            <Flex p="xl" direction={{ base: 'column', md: 'row' }}>
               <Flex justify="center" align="center" sx={{ flex: 1 / 2 }}>
                  <Flex direction="column" gap={{ base: 'sm' }} py="md" w="100%">
                     <Select
                        label="Cutsomer Name"
                        py="xs"
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label }}
                        data={users}
                        {...form.getInputProps('customerId')}
                     />

                     <Select
                        label="Type"
                        data={customerTransferTypes}
                        py="xs"
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                        {...form.getInputProps('type')}
                     />
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
