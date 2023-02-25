import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { getAllCategories, GetAllCategoriesResponse } from '../../../../api/category/queries/getAllCategories'
import PosTable from '../pos-table'
import { updateCategoryMutation } from '../../../../api/category/mutations/updateCategory'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { addCategoryMutation } from '../../../../api/category/mutations/addCategory'
import { getAllItems, GetAllItemsData } from '../../../../api/item/queries/getAllItems'
import { addItemMutation } from '../../../../api/item/mutations/addItem'

export type ItemActionFormType = Partial<NonNullable<GetAllItemsData>[0]>

const ItemsTable: React.FC = () => {
   //    const { data, isLoading, mutate: refetch } = useSWR<GetAllCategoriesResponse>('/item/all', getAllItems)
   //    //    const { trigger: updateCategory } = useSWRMutation('/category', updateItemMutation)
   //    const { trigger: addCategory } = useSWRMutation('/category', addItemMutation)

   //    const forms: ItemActionFormType = { name: '' }

   //    const addRow = async (values: { [key: string]: unknown }) => {
   //       await addCategory(values as any, {
   //          onSuccess: (data) =>
   //             showNotification({
   //                message: data.data.message,
   //                icon: <IconCheck />,
   //                color: 'teal',
   //             }),
   //       })
   //    }

   //    const updateRow = async (values: { [key: string]: unknown }) => {
   //       await updateCategory(values as any, {
   //          onSuccess: (data) =>
   //             showNotification({
   //                message: data.data.message,
   //                icon: <IconCheck />,
   //                color: 'teal',
   //             }),
   //       })
   //    }

   return <></>

   //    return (
   //       <PosTable
   //          data={data?.data}
   //          loading={isLoading}
   //          title="Category"
   //          forms={forms}
   //          updateRow={updateRow}
   //          addRow={addRow}
   //          refetch={refetch}
   //          action={{ update: true, delete: true }}
   //       />
   //    )
}

export default ItemsTable

// const categories =
//       data && data?.data?.length > 0
//          ? data.data.map((category) => ({
//               value: category.categoryId,
//               label: category.name,
//            }))
//          : []
