import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import PosTable from './table'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { getAllUsers, GetAllUsersResponse } from '../../../../api/user/queries/getAllUsers'
import { createUserMutation } from '../../../../api/user/mutations/createUser'
import { updateUserMutation } from '../../../../api/user/mutations/updateUser'
import { getAllCategories, GetAllCategoriesResponse } from '../../../../api/category/queries/getAllCategories'
import { updatePriceMutation } from '../../../../api/item/mutations/updatePrice'

const ItemsTable: React.FC = () => {
   const { data, isLoading, mutate: refetch } = useSWR<GetAllUsersResponse>('/user/all', getAllUsers)
   const { trigger: createUser, isMutating: creatingUser } = useSWRMutation('/user', createUserMutation)
   const { trigger: updateUser, isMutating: updatingItem } = useSWRMutation('/user', updateUserMutation)
   const { trigger: updateUserPassword, isMutating: updatingPrice } = useSWRMutation(
      '/user/pri',
      updatePriceMutation
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

   // const updateItemPrice = async (values: { [key: string]: unknown }) => {
   //    await updatePrice(values as any, {
   //       onSuccess: (data) =>
   //          showNotification({
   //             message: data.data.message,
   //             icon: <IconCheck />,
   //             color: 'teal',
   //          }),
   //    })
   // }

   const tableData = data?.data && data?.data.length > 0 ? data?.data : []

   return null

   // return (
   //    <PosTable
   //       data={tableData}
   //       loading={isLoading}
   //       formSubmitting={creatingUser || updatingItem}
   //       updatingPrice={updatingPrice}
   //       title="Item"
   //       updateRow={updateRow}
   //       addRow={addRow}
   //       excludeFields={['itemId', 'createdAt', 'updatedAt']}
   //       refetch={refetch as any}
   //    />
   // )
}

export default ItemsTable
