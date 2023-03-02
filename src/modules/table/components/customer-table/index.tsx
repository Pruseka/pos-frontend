import { getAllCustomers, GetAllCustomersResponse } from '../../../../api/customer/queries/getAllCustomers'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import PosTable from './table'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { updateCustomerMutation } from '../../../../api/customer/mutations/updateCustomer'
import { addCustomerMutation } from '../../../../api/customer/mutations/addCustomer'

// export type CustomerActionFormType = Partial<NonNullable<GetAllCustomersData>[0]>

const CustomersTable: React.FC = () => {
   const {
      data,
      isLoading,
      mutate: refetch,
   } = useSWR<GetAllCustomersResponse>('/customer/all', getAllCustomers)
   const { trigger: addCustomer, isMutating: addingCustomer } = useSWRMutation(
      '/customer',
      addCustomerMutation
   )
   const { trigger: updateCustomer, isMutating: updatingCustomer } = useSWRMutation(
      '/customer',
      updateCustomerMutation
   )

   const addRow = async (values: { [key: string]: unknown }) => {
      await addCustomer(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const updateRow = async (values: { [key: string]: unknown }) => {
      await updateCustomer(values as any, {
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
         formSubmitting={addingCustomer || updatingCustomer}
         title="Customer"
         updateRow={updateRow}
         addRow={addRow}
         excludeFields={['customerId', 'createdAt', 'updatedAt']}
         refetch={refetch as any}
      />
   )
}

export default CustomersTable
