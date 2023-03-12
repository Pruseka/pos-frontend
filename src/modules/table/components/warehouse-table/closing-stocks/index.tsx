import { useState } from 'react'
import useSWR from 'swr'
import {
   GetSalesmanClosingStocksResponse,
   getSalesmanClosingStocks,
} from '../../../../../api/salesman-stock/queries/getClosingStocks'
import {
   getAllUsers,
   GetAllUsersData,
   GetAllUsersResponse,
} from '../../../../../api/user/queries/getAllUsers'
import {
   getWarehouseClosingStocks,
   GetWarehouseClosingStocksResponse,
} from '../../../../../api/warehouse/queries/getClosingStock'
import PosTable from './table'

const WarehouseClosingStocksTable: React.FC = () => {
   const [value, setValue] = useState(new Date())

   const shouldRefetch = !!value
   const { data, isLoading } = useSWR<GetWarehouseClosingStocksResponse>(
      shouldRefetch ? ['/warehouse/closing', value] : null,
      ([url, to]: string[]) => getWarehouseClosingStocks(url, to)
   )

   const tableData = data?.data && data?.data.length > 0 ? data?.data : []

   return (
      <PosTable
         data={tableData}
         loading={isLoading}
         dateValue={value}
         setDate={setValue}
         title="Warehosue Stocks"
         excludeFields={['itemId']}
      />
   )
}

export default WarehouseClosingStocksTable
