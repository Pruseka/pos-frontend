import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   getWarehouseOutStocks,
   GetWarehouseOutStocksData,
   GetWarehouseOutStocksResponse,
} from '../../../../../api/warehouse/queries/getOutStocks'
import PosTable from './table'

const WarehouseOutStocksTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetWarehouseOutStocksData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetWarehouseOutStocksResponse>(
      shouldRefetch ? ['/warehouse/out', ...dates] : null,
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
         title="Transfer Records"
         excludeFields={['itemId', 'list', 'createdAt']}
      />
   )
}

export default WarehouseOutStocksTable
