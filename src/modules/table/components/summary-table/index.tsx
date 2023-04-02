import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getSummary, GetSummaryData, GetSummaryResponse } from '../../../../api/summary/queries/getSummary'
import { getWarehouseInStocks } from '../../../../api/warehouse/queries/getInStocks'
import Table from './table'

// export type CustomerActionFormType = Partial<NonNullable<GetAllCustomersData>[0]>

const initialState = {
   openingBalance: 0,
   closingBalance: 0,
   purchasingAmount: 0,
   sellingAmount: 0,
   cogs: 0,
   grossProfit: 0,
   expenseAmount: 0,
   netProfit: 0,
   cashIn: 0,
   cashOut: 0,
   balance: 0,
}

const SummaryTable: React.FC = () => {
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])

   const [summaryData, setSummaryData] = useState<GetSummaryData>(initialState)
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const { data, isLoading } = useSWR<GetSummaryResponse>(
      shouldRefetch ? ['/summary', ...dates] : null,
      ([url, from, to]: string[]) => getSummary(url, from, to)
   )

   useEffect(() => {
      const resData = data?.data ? data?.data : initialState
      if (unselectedDate || shouldRefetch) {
         setSummaryData(resData)
      }
   }, [data?.data, shouldRefetch, unselectedDate])

   return <Table data={summaryData} dateValue={value} setDate={setValue} title="Summary" />
}

export default SummaryTable
