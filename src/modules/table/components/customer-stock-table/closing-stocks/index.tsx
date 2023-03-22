import { useState } from 'react'
import useSWR from 'swr'
import {
   getCustomerClosingStocks,
   GetCustomerClosingStocksResponse,
} from '../../../../../api/customer-stock/queries/getClosingStocks'
import { getAllCustomers, GetAllCustomersResponse } from '../../../../../api/customer/queries/getAllCustomers'
import {
   GetSalesmanClosingStocksResponse,
   getSalesmanClosingStocks,
} from '../../../../../api/salesman-stock/queries/getClosingStocks'
import {
   getAllUsers,
   GetAllUsersData,
   GetAllUsersResponse,
} from '../../../../../api/user/queries/getAllUsers'
import PosTable from './table'

const CustomerClosingStocksTable: React.FC = () => {
   const [value, setValue] = useState(new Date())
   const { data: customersData } = useSWR<GetAllCustomersResponse>('/customer/all', getAllCustomers)
   const customers = customersData?.data
      ? customersData.data.map((customer) => ({ label: customer.name, value: customer.customerId }))
      : []

   const [customerId, setCustomerId] = useState<string | null>(null)

   const shouldRefetch = !!(value && customerId)
   const { data, isLoading } = useSWR<GetCustomerClosingStocksResponse>(
      shouldRefetch ? ['/customer_stock/closing', value, customerId] : null,
      ([url, to, customerId]: string[]) => getCustomerClosingStocks(url, to, customerId)
   )

   const tableData = data?.data && data?.data.length > 0 ? data?.data : []

   return (
      <PosTable
         data={tableData}
         loading={isLoading}
         customerId={customerId}
         customers={customers}
         setCustomerId={setCustomerId}
         dateValue={value}
         setDate={setValue}
         title="Customer Stocks"
         excludeFields={['itemId']}
      />
   )
}

export default CustomerClosingStocksTable
