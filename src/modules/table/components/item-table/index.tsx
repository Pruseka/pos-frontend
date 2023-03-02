import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import PosTable from './table'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { getAllItems, GetAllItemsResponse } from '../../../../api/item/queries/getAllItems'
import { addItemMutation } from '../../../../api/item/mutations/addItem'
import { updateItemMutation } from '../../../../api/item/mutations/updateItem'
import { getAllCategories, GetAllCategoriesResponse } from '../../../../api/category/queries/getAllCategories'
import { updatePriceMutation } from '../../../../api/item/mutations/updatePrice'

const ItemsTable: React.FC = () => {
   const { data, isLoading, mutate: refetch } = useSWR<GetAllItemsResponse>('/item/all', getAllItems)
   const { data: categoriesData } = useSWR<GetAllCategoriesResponse>('/category/all', getAllCategories)
   const { trigger: addItem, isMutating: addingItem } = useSWRMutation('/item', addItemMutation)
   const { trigger: updateItem, isMutating: updatingItem } = useSWRMutation('/item', updateItemMutation)
   const { trigger: updatePrice, isMutating: updatingPrice } = useSWRMutation(
      '/item/price',
      updatePriceMutation
   )

   const addRow = async (values: { [key: string]: unknown }) => {
      await addItem(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const updateRow = async (values: { [key: string]: unknown }) => {
      await updateItem(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const updateItemPrice = async (values: { [key: string]: unknown }) => {
      await updatePrice(values as any, {
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
         categoriesData={categoriesData}
         loading={isLoading}
         formSubmitting={addingItem || updatingItem}
         updatingPrice={updatingPrice}
         title="Item"
         updateRow={updateRow}
         updatePrice={updateItemPrice}
         addRow={addRow}
         excludeFields={['itemId', 'createdAt', 'updatedAt']}
         refetch={refetch as any}
      />
   )
}

export default ItemsTable
