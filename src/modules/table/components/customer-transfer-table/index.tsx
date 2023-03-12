import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   GetAllCustomerTransfersData,
   GetAllCustomerTransfersResponse,
   getCustomerTransfersByDate,
} from '../../../../api/customerTransfer/queries/getTransfersByDate'
import PosTable from './table'

const CustomerTransfersTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetAllCustomerTransfersData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))
   console.log(dates, value)

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetAllCustomerTransfersResponse>(
      shouldRefetch ? ['/customer_transfer', ...dates] : null,
      ([url, from, to]: string[]) => getCustomerTransfersByDate(url, from, to)
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
         title="Transfer"
         excludeFields={['items', 'createdAt']}
      />
   )
}

export default CustomerTransfersTable
