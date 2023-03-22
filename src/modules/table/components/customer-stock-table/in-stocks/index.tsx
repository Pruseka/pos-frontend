import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
   getCustomerInStocks,
   GetCustomerInStocksData,
   GetCustomerInStocksResponse,
} from '../../../../../api/customer-stock/queries/getInStocks'
import { getAllCustomers, GetAllCustomersResponse } from '../../../../../api/customer/queries/getAllCustomers'
import {
   getSalesmanInStocks,
   GetSalesmanInStocksData,
   GetSalesmanInStocksResponse as GetCustomersInStocksResponse,
} from '../../../../../api/salesman-stock/queries/getInStocks'
import { GetAllUsersResponse, getAllUsers } from '../../../../../api/user/queries/getAllUsers'
import {
   getWarehouseOutStocks,
   GetWarehouseOutStocksData,
   GetWarehouseOutStocksResponse,
} from '../../../../../api/warehouse/queries/getOutStocks'
import PosTable from './table'

const CustomerInStocksTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetCustomerInStocksData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))
   const [customerId, setCustomerId] = useState<string | null>(null)

   const { data: customersData } = useSWR<GetAllCustomersResponse>('/customer/all', getAllCustomers)
   const customers = customersData?.data
      ? customersData.data.map((user) => ({ label: user.name, value: user.customerId }))
      : []

   const shouldRefetch = dates.every((d: any) => d !== undefined) && customerId
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetCustomerInStocksResponse>(
      shouldRefetch ? ['/customer_stock/in', ...dates, customerId] : null,
      ([url, from, to, userId]: string[]) => getCustomerInStocks(url, from, to, userId)
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
         customerId={customerId}
         customers={customers}
         setCustomerId={setCustomerId}
         title="In Records"
         excludeFields={['itemId', 'list', 'createdAt']}
      />
   )
}

export default CustomerInStocksTable
