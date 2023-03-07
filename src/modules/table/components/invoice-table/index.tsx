import { getAllCustomers, GetAllCustomersResponse } from '../../../../api/customer/queries/getAllCustomers'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import PosTable from './table'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { updateCustomerMutation } from '../../../../api/customer/mutations/updateCustomer'
import { addCustomerMutation } from '../../../../api/customer/mutations/addCustomer'
import { GetAllInvoicesResponse, getInvoicesByDate } from '../../../../api/invoice/queries/getInvoicesByDate'
import { useState } from 'react'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates'

const InvoiceTable: React.FC = () => {
   const [value, setValue] = useState<DateRangePickerValue>([new Date(2023, 2, 2), new Date()])
   const dates: any = value.map((value) => value?.toISOString().split('T')[0])

   const { data, isLoading } = useSWR<GetAllInvoicesResponse>(
      ['/invoice', ...dates],
      ([url, from, to]: string[]) => getInvoicesByDate(url, from, to)
   )

   const tableData = data?.data && data?.data.length > 0 ? data?.data : []

   return (
      <PosTable
         data={tableData}
         loading={isLoading}
         dateValue={value}
         setDate={setValue}
         title="Invoice"
         excludeFields={['invoiceId', 'createdBy', 'items', 'createdAt']}
      />
   )
}

export default InvoiceTable
