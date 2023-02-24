import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { getAllCategories, GetAllCategoriesResponse } from '../../../../api/category/queries/getAllCategories'
import PosTable from '../pos-table'
import { updateCategoryMutation } from '../../../../api/category/mutations/updateCategory'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import type { GetAllCategoriesData } from '../../../../api/category/queries/getAllCategories'

export type CategoryActionFormType = Partial<NonNullable<GetAllCategoriesData>[0]>

const CategoriesTable: React.FC = () => {
   const {
      data,
      isLoading,
      mutate: refetch,
   } = useSWR<GetAllCategoriesResponse>('/customer/all', getAllCategories)
   const { trigger: updateTrigger } = useSWRMutation('/category', updateCategoryMutation)

   const forms: CategoryActionFormType = { name: '' }

   const updateRow = async (values: { [key: string]: unknown }) => {
      await updateTrigger(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   /**
    * @error
    * need to fix
    */
   if (!data) return <></>

   return (
      <PosTable
         data={data?.data}
         loading={isLoading}
         title="Categories"
         forms={forms}
         updateRow={updateRow}
         refetch={refetch}
         action={{ update: true, delete: true }}
      />
   )
}

export default CategoriesTable
