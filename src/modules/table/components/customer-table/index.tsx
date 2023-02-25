import {
   CustomerType,
   getAllCustomers,
   GetAllCustomersData,
   GetAllCustomersResponse,
} from '../../../../api/customer/queries/getAllCustomers'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import PosTable from '../pos-table'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { updateCustomerMutation } from '../../../../api/customer/mutations/updateCustomer'
import { addCustomerMutation } from '../../../../api/customer/mutations/addCustomer'

export type CustomerActionFormType = Partial<NonNullable<GetAllCustomersData>[0]>

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

   const customerTypeValues = Object.values(CustomerType).map((type) => ({ label: type, value: type }))

   const customerTypes = {
      title: 'Customer Type',
      values: customerTypeValues,
   }

   const forms: CustomerActionFormType = {
      name: '',
      address: '',
      phone: '',
      code: '',
      type: customerTypes as any,
   }

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

   const tableData =
      data?.data && data?.data.length > 0
         ? data?.data.map((item) => {
              const color = item.type === CustomerType.RETAIL ? 'teal' : 'blue'
              return { ...item, type: { isBadge: true, color, value: item.type } }
           })
         : []

   return (
      <PosTable
         data={tableData as any}
         loading={isLoading}
         formSubmitting={addingCustomer || updatingCustomer}
         title="Customer"
         forms={forms}
         updateRow={updateRow}
         addRow={addRow}
         refetch={refetch}
         action={{ update: true, delete: true }}
      />
   )
}

export default CustomersTable
