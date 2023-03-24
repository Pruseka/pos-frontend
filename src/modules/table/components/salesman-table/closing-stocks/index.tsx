import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   GetSalesmanClosingStocksResponse,
   getSalesmanClosingStocks,
} from '../../../../../api/salesman-stock/queries/getClosingStocks'
import { UserRole } from '../../../../../api/user/mutations/createUser'
import {
   getAllUsers,
   GetAllUsersData,
   GetAllUsersResponse,
} from '../../../../../api/user/queries/getAllUsers'
import { useAuth } from '../../../../../lib/contexts/auth-context'
import PosTable from './table'

const SalesmanClosingStocksTable: React.FC = () => {
   const [value, setValue] = useState(new Date())
   const { user } = useAuth()
   const shouldFetchUser = user?.role !== UserRole.VAN_SALES
   const { data: usersData } = useSWR<GetAllUsersResponse>(
      shouldFetchUser ? '/user/van_sales' : null,
      getAllUsers
   )
   const users = usersData?.data
      ? usersData.data.map((user) => ({ label: user.name, value: user.userId }))
      : []

   const [userId, setUserId] = useState<string | null>(null)

   const shouldRefetch = !!(value && userId)

   console.log('should fetch', shouldRefetch)
   const { data, isLoading } = useSWR<GetSalesmanClosingStocksResponse>(
      shouldRefetch ? ['/van_stock/closing', value, userId] : null,
      ([url, to, userId]: string[]) => getSalesmanClosingStocks(url, to, userId)
   )

   const tableData = data?.data && data?.data.length > 0 ? data?.data : []

   useEffect(() => {
      if (user?.role === UserRole.VAN_SALES) {
         setUserId(user.userId)
      }
   }, [user?.role, user?.userId])

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
