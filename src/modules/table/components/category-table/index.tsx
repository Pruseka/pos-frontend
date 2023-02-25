import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { getAllCategories, GetAllCategoriesResponse } from '../../../../api/category/queries/getAllCategories'
import PosTable from '../pos-table'
import { updateCategoryMutation } from '../../../../api/category/mutations/updateCategory'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import type { GetAllCategoriesData } from '../../../../api/category/queries/getAllCategories'
import { addCategoryMutation } from '../../../../api/category/mutations/addCategory'

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

   const forms: CategoryActionFormType = { name: '' }

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

   return (
      <PosTable
         data={data?.data}
         loading={isLoading}
         title="Category"
         formSubmitting={addingCategory || updatingCategory}
         forms={forms}
         updateRow={updateRow}
         addRow={addRow}
         refetch={refetch}
         action={{ update: true, delete: true }}
      />
   )
}

export default CategoriesTable
