import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   GetWarehouseInvoiceRecordsData,
   GetWarehouseInvoiceRecordsResponse,
} from '../../../../../api/warehouse/queries/getInvoiceRecords'
import { getWarehouseOutStocks } from '../../../../../api/warehouse/queries/getOutStocks'
import PosTable from './table'

const WarehouseInvoiceRecordsTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetWarehouseInvoiceRecordsData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetWarehouseInvoiceRecordsResponse>(
      shouldRefetch ? ['/warehouse/invoice', ...dates] : null,
      ([url, from, to]: string[]) => getWarehouseOutStocks(url, from, to)
   )

   useEffect(() => {
      const tableData = data?.data && data?.data.length > 0 ? data?.data : []
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
         title="Invoice Records"
         excludeFields={['itemId', 'list', 'createdAt']}
      />
   )
}

export default WarehouseInvoiceRecordsTable
