import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   getWarehouseInStocks,
   GetWarehouseInStocksData,
   GetWarehouseInStocksResponse,
} from '../../../../../api/warehouse/queries/getInStocks'
import PosTable from './table'

const WarehouseInStocksTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetWarehouseInStocksData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetWarehouseInStocksResponse>(
      shouldRefetch ? ['/warehouse/in', ...dates] : null,
      ([url, from, to]: string[]) => getWarehouseInStocks(url, from, to)
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
         title="In Records"
         excludeFields={['itemId', 'list', 'createdAt']}
      />
   )
}

export default WarehouseInStocksTable
