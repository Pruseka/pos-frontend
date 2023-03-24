import { Box, Button, Flex, Select } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { openConfirmModal } from '@mantine/modals'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { TransferType } from '../../../../../api/transfer/queries/getTransfersByDate'
import { getAllUsers, GetAllUsersResponse } from '../../../../../api/user/queries/getAllUsers'
import { getAllVansales } from '../../../../../api/user/queries/getAllVansales'
import useStyles from './styles'

export interface FormValues {
   userId: string
   type: TransferType
}

interface Props {
   submitForm: (values: FormValues) => Promise<void>
   disabledSaveButton: boolean
}

const UserForm: React.FC<Props> = ({ submitForm, disabledSaveButton }) => {
   const navigate = useNavigate()
   const { classes } = useStyles()
   const { data: usersData } = useSWR<GetAllUsersResponse>('/user/van_sales', getAllVansales)
   const users =
      usersData?.data && usersData.data.length > 0
         ? usersData?.data.map((user) => ({ label: user.name, value: user.userId }))
         : []

   const transferTypes = Object.values(TransferType).map((type) => ({ label: type, value: type }))

   const initialValues = {
      userId: '',
      type: TransferType.FROM,
   }

   const form = useForm<FormValues>({
      initialValues,
      validate: {
         userId: isNotEmpty('User must be filled'),
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
                        label="Type"
                        data={transferTypes}
                        py="xs"
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                        {...form.getInputProps('type')}
                     />

                     <Select
                        label="User Name"
                        py="xs"
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label }}
                        data={users}
                        {...form.getInputProps('userId')}
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

export default UserForm
