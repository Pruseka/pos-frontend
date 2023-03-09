import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { addSupplierMutation } from '../../../../api/supplier/mutations/addSupplier'
import { updateSupplierMutation } from '../../../../api/supplier/mutations/updateSupplier'
import { GetAllSuppliersResponse } from '../../../../api/supplier/queries/getAllSuppliers'
import { getAllSuppliers } from '../../../../api/supplier/queries/getAllSuppliers'
import PosTable from './table'

// export type CustomerActionFormType = Partial<NonNullable<GetAllCustomersData>[0]>

const SuppliersTable: React.FC = () => {
   const {
      data,
      isLoading,
      mutate: refetch,
   } = useSWR<GetAllSuppliersResponse>('/supplier/all', getAllSuppliers)
   const { trigger: addSupplier, isMutating: addingSupplier } = useSWRMutation(
      '/supplier',
      addSupplierMutation
   )
   const { trigger: updateSupplier, isMutating: updatingSupplier } = useSWRMutation(
      '/supplier',
      updateSupplierMutation
   )

   const addRow = async (values: { [key: string]: unknown }) => {
      await addSupplier(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const updateRow = async (values: { [key: string]: unknown }) => {
      console.log(values)
      await updateSupplier(values as any, {
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
         formSubmitting={addingSupplier || updatingSupplier}
         title="Supplier"
         updateRow={updateRow}
         addRow={addRow}
         excludeFields={['supplierId', 'createdAt', 'updatedAt']}
         refetch={refetch as any}
      />
   )
}

export default SuppliersTable
