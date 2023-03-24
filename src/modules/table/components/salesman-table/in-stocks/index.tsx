import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   getSalesmanInStocks,
   GetSalesmanInStocksData,
   GetSalesmanInStocksResponse,
} from '../../../../../api/salesman-stock/queries/getInStocks'
import { UserRole } from '../../../../../api/user/mutations/createUser'
import { GetAllUsersResponse, getAllUsers } from '../../../../../api/user/queries/getAllUsers'
import {
   getWarehouseOutStocks,
   GetWarehouseOutStocksData,
   GetWarehouseOutStocksResponse,
} from '../../../../../api/warehouse/queries/getOutStocks'
import { useAuth } from '../../../../../lib/contexts/auth-context'
import PosTable from './table'

const SalesmanInStocksTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetSalesmanInStocksData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const [userId, setUserId] = useState<string | null>(null)
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))

   const { user } = useAuth()
   const shouldFetchUser = user?.role !== UserRole.VAN_SALES
   const { data: usersData } = useSWR<GetAllUsersResponse>(
      shouldFetchUser ? '/user/van_sales' : null,
      getAllUsers
   )
   const users = usersData?.data
      ? usersData.data.map((user) => ({ label: user.name, value: user.userId }))
      : []

   const shouldRefetch = dates.every((d: any) => d !== undefined) && userId
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetSalesmanInStocksResponse>(
      shouldRefetch ? ['/van_stock/transfer', ...dates, userId] : null,
      ([url, from, to, userId]: string[]) => getSalesmanInStocks(url, from, to, userId)
   )

   useEffect(() => {
      const tableData = data?.data && data?.data.length > 0 ? data?.data : []
      if (unselectedDate || shouldRefetch) {
         setTblData(tableData)
      }
   }, [data?.data, shouldRefetch, unselectedDate])

   useEffect(() => {
      if (user?.role === UserRole.VAN_SALES) {
         setUserId(user.userId)
      }
   }, [user?.role, user?.userId])

   return (
      <PosTable
         data={tblData}
         loading={isLoading}
         dateValue={value}
         setDate={setValue}
         userId={userId}
         users={users}
         setUserId={setUserId}
         title="Transfer Records"
         excludeFields={['itemId', 'list', 'createdAt']}
      />
   )
}

export default SalesmanInStocksTable
