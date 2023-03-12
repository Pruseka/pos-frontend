import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   getSalesmanInStocks,
   GetSalesmanInStocksData,
   GetSalesmanInStocksResponse,
} from '../../../../../api/salesman-stock/queries/getInStocks'
import { GetAllUsersResponse, getAllUsers } from '../../../../../api/user/queries/getAllUsers'
import {
   getWarehouseOutStocks,
   GetWarehouseOutStocksData,
   GetWarehouseOutStocksResponse,
} from '../../../../../api/warehouse/queries/getOutStocks'
import PosTable from './table'

const SalesmanInStocksTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetSalesmanInStocksData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))
   const [userId, setUserId] = useState<string | null>(null)

   const { data: usersData } = useSWR<GetAllUsersResponse>('/user/all', getAllUsers)
   const users = usersData?.data
      ? usersData.data.map((user) => ({ label: user.name, value: user.userId }))
      : []

   const shouldRefetch = dates.every((d: any) => d !== undefined) && userId
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetSalesmanInStocksResponse>(
      shouldRefetch ? ['/stock/in', ...dates, userId] : null,
      ([url, from, to, userId]: string[]) => getSalesmanInStocks(url, from, to, userId)
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
         userId={userId}
         users={users}
         setUserId={setUserId}
         title="In Records"
         excludeFields={['itemId', 'list', 'createdAt']}
      />
   )
}

export default SalesmanInStocksTable
