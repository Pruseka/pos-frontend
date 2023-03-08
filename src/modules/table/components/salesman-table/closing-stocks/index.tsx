import { useState } from 'react'
import useSWR from 'swr'
import {
   GetSalesmanClosingStockResponse,
   getSalesmanClosingStocks,
} from '../../../../../api/salesman-stock/queries/getClosingStock'
import PosTable from './table'

const SalesmanClosingStocksTable: React.FC = () => {
   const [value, setValue] = useState(new Date())
   const shouldRefetch = !!value

   const { data, isLoading } = useSWR<GetSalesmanClosingStockResponse>(
      shouldRefetch ? ['/stock/closing', value, '552df910-b1fa-11ed-8dfd-c930edf6a8de'] : null,
      ([url, to, userId]: string[]) => getSalesmanClosingStocks(url, to, userId)
   )

   const tableData = data?.data && data?.data.length > 0 ? data?.data : []

   return (
      <PosTable
         data={tableData}
         loading={isLoading}
         dateValue={value}
         setDate={setValue}
         title="Invoice"
         excludeFields={['itemId']}
      />
   )
}

export default SalesmanClosingStocksTable
