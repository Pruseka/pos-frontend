import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { getAllCategories, GetAllCategoriesResponse } from '../../../../api/category/queries/getAllCategories'
import PosTable from './table'
import { updateCategoryMutation } from '../../../../api/category/mutations/updateCategory'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { addCategoryMutation } from '../../../../api/category/mutations/addCategory'
import type { GetAllCategoriesData } from '../../../../api/category/queries/getAllCategories'

export type CategoryActionFormType = Partial<NonNullable<GetAllCategoriesData>[0]>

const CategoriesTable: React.FC = () => {
   const {
      data,
      isLoading,
      mutate: refetch,
   } = useSWR<GetAllCategoriesResponse>('/category/all', getAllCategories)
   const { trigger: updateCategory, isMutating: addingCategory } = useSWRMutation(
      '/category',
      updateCategoryMutation
   )
   const { trigger: addCategory, isMutating: updatingCategory } = useSWRMutation(
      '/category',
      addCategoryMutation
   )

   const addRow = async (values: { [key: string]: unknown }) => {
      await addCategory(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const updateRow = async (values: { [key: string]: unknown }) => {
      await updateCategory(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const tableData = data?.data && data.data.length > 0 ? data.data : []

   return (
      <PosTable
         data={tableData}
         loading={isLoading}
         title="Category"
         formSubmitting={addingCategory || updatingCategory}
         updateRow={updateRow}
         addRow={addRow}
         refetch={refetch as any}
         excludeFields={['categoryId']}
      />
   )
}

export default CategoriesTable
