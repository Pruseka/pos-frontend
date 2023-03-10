import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   GetAllSuppliesData,
   GetAllSuppliesResponse,
   getSuppliesByDate,
} from '../../../../api/supply/queries/getSupplyByDate'
import PosTable from './table'

const SupplyTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetAllSuppliesData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))
   console.log(dates, value)

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetAllSuppliesResponse>(
      shouldRefetch ? ['/supply', ...dates] : null,
      ([url, from, to]: string[]) => getSuppliesByDate(url, from, to)
   )

   useEffect(() => {
      const tableData =
         data?.data && data?.data.length > 0
            ? data?.data.map((d) => ({
                 supplyId: d.supplyId,
                 createdByName: d.createdByName,
                 supplier: d.supplier,
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
         title="Supply"
         excludeFields={['createdBy', 'items', 'createdAt']}
      />
   )
}

export default SupplyTable
