import { getAllCustomers, GetAllCustomersResponse } from '../../../../api/customer/queries/getAllCustomers'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import PosTable from './table'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { updateCustomerMutation } from '../../../../api/customer/mutations/updateCustomer'
import { addCustomerMutation } from '../../../../api/customer/mutations/addCustomer'
import {
   getExpensesByDate,
   GetExpensesByDateData,
   GetExpensesByDateResponse,
} from '../../../../api/expense/queries/getExpensesByDate'
import { addExpenseMutation } from '../../../../api/expense/mutations/addExpense'
import { updateExpenseMutation } from '../../../../api/expense/mutations/updateExpense'
import { DateRangePickerValue } from '@mantine/dates'
import { useEffect, useState } from 'react'

// export type CustomerActionFormType = Partial<NonNullable<GetAllCustomersData>[0]>

const ExpensesTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetExpensesByDateData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const {
      data,
      isLoading,
      mutate: refetch,
   } = useSWR<GetExpensesByDateResponse>(
      shouldRefetch ? ['/expense', ...dates] : null,
      ([url, from, to]: string[]) => getExpensesByDate(url, from, to)
   )
   const { trigger: addExpense, isMutating: addingExpense } = useSWRMutation('/expense', addExpenseMutation)
   const { trigger: updateExpense, isMutating: updatingExpense } = useSWRMutation(
      '/expense',
      updateExpenseMutation
   )

   const addRow = async (values: { [key: string]: unknown }) => {
      await addExpense(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

   const updateRow = async (values: { [key: string]: unknown }) => {
      await updateExpense(values as any, {
         onSuccess: (data) =>
            showNotification({
               message: data.data.message,
               icon: <IconCheck />,
               color: 'teal',
            }),
      })
   }

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
         formSubmitting={addingExpense || updatingExpense}
         title="Expense"
         updateRow={updateRow}
         addRow={addRow}
         dateValue={value}
         setDate={setValue}
         excludeFields={['expenseId']}
         refetch={refetch as any}
      />
   )
}

export default ExpensesTable
