import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   GetAllCustomerTransfersData,
   GetAllCustomerTransfersResponse,
} from '../../../../api/customerTransfer/queries/getTransfersByDate'
import {
   GetAllSuppliesData,
   GetAllSuppliesResponse,
   getSuppliesByDate,
} from '../../../../api/supply/queries/getSupplyByDate'
import {
   GetAllTransfersData,
   GetAllTransfersResponse,
   getTransfersByDate,
} from '../../../../api/transfer/queries/getTransfersByDate'
import PosTable from './table'

const TransfersTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetAllCustomerTransfersData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))
   console.log(dates, value)

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetAllCustomerTransfersResponse>(
      shouldRefetch ? ['/transfer', ...dates] : null,
      ([url, from, to]: string[]) => getTransfersByDate(url, from, to)
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
         title="Supply"
         excludeFields={['createdBy', 'items', 'createdAt']}
      />
   )
}

export default TransfersTable
