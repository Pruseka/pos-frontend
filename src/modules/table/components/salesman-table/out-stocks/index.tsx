import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   getSalesmanOutStocks,
   GetSalesmanOutStocksData,
   GetSalesmanOutStocksResponse,
} from '../../../../../api/salesman-stock/queries/getOutStocks'
import { getAllUsers, GetAllUsersResponse } from '../../../../../api/user/queries/getAllUsers'
import PosTable from './table'

const SalesmanOutStocksTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetSalesmanOutStocksData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))
   const [userId, setUserId] = useState<string | null>(null)
   const { data: usersData } = useSWR<GetAllUsersResponse>('/user/van_sales', getAllUsers)

   const users = usersData?.data
      ? usersData.data.map((user) => ({ label: user.name, value: user.userId }))
      : []

   const shouldRefetch = dates.every((d: any) => d !== undefined) && userId
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetSalesmanOutStocksResponse>(
      shouldRefetch ? ['/van_stock/invoice', ...dates, userId] : null,
      ([url, from, to, userId]: string[]) => getSalesmanOutStocks(url, from, to, userId)
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
         title="Invoice Records"
         excludeFields={['itemId', 'list', 'createdAt']}
      />
   )
}

export default SalesmanOutStocksTable
