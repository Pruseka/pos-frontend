import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   GetAllInvoicesData,
   GetAllInvoicesResponse,
   getInvoicesByDate,
} from '../../../../api/invoice/queries/getInvoicesByDate'
import PosTable from './table'

const InvoiceTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetAllInvoicesData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toISOString().split('T')[0])

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetAllInvoicesResponse>(
      shouldRefetch ? ['/invoice', ...dates] : null,
      ([url, from, to]: string[]) => getInvoicesByDate(url, from, to)
   )

   useEffect(() => {
      const tableData =
         data?.data && data?.data.length > 0
            ? data?.data.map((d) => ({
                 invoiceId: d.invoiceId,
                 createdByName: d.createdByName,
                 customer: d.customer,
                 customerType: d.customerType,
                 type: d.type,
                 status: d.status,
                 createdBy: d.createdBy,
                 createdAt: d.createdAt,
                 items: d.items,
                 amount: d.amount,
              }))
            : []
      if (unselectedDate || shouldRefetch) {
         setTblData(tableData)
      }
   }, [data?.data, shouldRefetch, unselectedDate])

   return (
      <PosTable
         data={tblData}
         loading={isLoading}
         dateValue={value}
         setDate={setValue}
         title="Invoice"
         excludeFields={['createdBy', 'items', 'createdAt']}
      />
   )
}

export default InvoiceTable
