import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { createUserMutation } from '../../../../api/user/mutations/createUser'
import { updateUserMutation } from '../../../../api/user/mutations/updateUser'
import { updateUserPasswordMutation } from '../../../../api/user/mutations/updateUserPassword'
import { getAllUsers, GetAllUsersResponse } from '../../../../api/user/queries/getAllUsers'
import PosTable from './table'

const UsersTable: React.FC = () => {
   const { data, isLoading, mutate: refetch } = useSWR<GetAllUsersResponse>('/user/all', getAllUsers)
   const { trigger: createUser, isMutating: creatingUser } = useSWRMutation('/user', createUserMutation)
   const { trigger: updateUser, isMutating: updatingItem } = useSWRMutation('/user', updateUserMutation)
   const { trigger: updateUserPassword, isMutating: updatingPassword } = useSWRMutation(
      '/user/password',
      updateUserPasswordMutation
   )

   const addRow = async (values: { [key: string]: unknown }) => {
      await createUser(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const updateRow = async (values: { [key: string]: unknown }) => {
      await updateUser(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const updatePassword = async (values: { [key: string]: unknown }) => {
      console.log('pw', values)
      await updateUserPassword(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const tableData = data?.data && data?.data.length > 0 ? data?.data : []

   return (
      <PosTable
         data={tableData}
         loading={isLoading}
         formSubmitting={creatingUser || updatingItem}
         title="User"
         updateRow={updateRow}
         addRow={addRow}
         excludeFields={['userId', 'password', 'updatedAt', 'createdAt']}
         refetch={refetch as any}
         updatePassword={updatePassword}
         updatingPassword={updatingPassword}
      />
   )
}

export default UsersTable
