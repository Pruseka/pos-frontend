import { useState } from 'react'
import useSWR from 'swr'
import {
   GetSalesmanClosingStocksResponse,
   getSalesmanClosingStocks,
} from '../../../../../api/salesman-stock/queries/getClosingStock'
import {
   getAllUsers,
   GetAllUsersData,
   GetAllUsersResponse,
} from '../../../../../api/user/queries/getAllUsers'
import PosTable from './table'

const SalesmanClosingStocksTable: React.FC = () => {
   const [value, setValue] = useState(new Date())
   const { data: usersData } = useSWR<GetAllUsersResponse>('/user/all', getAllUsers)
   const users = usersData?.data
      ? usersData.data.map((user) => ({ label: user.name, value: user.userId }))
      : []

   const [userId, setUserId] = useState<string | null>(null)

   const shouldRefetch = !!(value && userId)
   const { data, isLoading } = useSWR<GetSalesmanClosingStocksResponse>(
      shouldRefetch ? ['/stock/closing', value, userId] : null,
      ([url, to, userId]: string[]) => getSalesmanClosingStocks(url, to, userId)
   )

   const tableData = data?.data && data?.data.length > 0 ? data?.data : []

   return (
      <PosTable
         data={tableData}
         loading={isLoading}
         userId={userId}
         users={users}
         setUserId={setUserId}
         dateValue={value}
         setDate={setValue}
         title="Salesman Stocks"
         excludeFields={['itemId']}
      />
   )
}

export default SalesmanClosingStocksTable
