import { DateRangePickerValue } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateInvoiceMutation } from '../../../../../api/invoice/mutations/updateInvoice'
import { GetAllCreditInvoicesResponse } from '../../../../../api/invoice/queries/getCreditInvoiceByDate'
import { getInvoicesByDate } from '../../../../../api/invoice/queries/getInvoicesByDate'
import {
   GetAllCreditSuppliesData,
   GetAllCreditSuppliesResponse,
   getCreditSuppliesByDate,
} from '../../../../../api/supply/queries/getCreditSupplyByDate'
import PosTable from './table'
import { updateSupplyMutation } from '../../../../../api/supply/mutations/updateSupply'

const CreditSupplyTable: React.FC = () => {
   const [tblData, setTblData] = useState<GetAllCreditSuppliesData>([])
   const [value, setValue] = useState<DateRangePickerValue>([new Date(), new Date()])
   const dates: any = value.map((value) => value?.toLocaleDateString('en-US'))

   const shouldRefetch = dates.every((d: any) => d !== undefined)
   const unselectedDate = dates.every((d: any) => d === undefined)

   const {
      data,
      isLoading,
      mutate: refetch,
   } = useSWR<GetAllCreditSuppliesResponse>(
      shouldRefetch ? ['/supply/credit', ...dates] : null,
      ([url, from, to]: string[]) => getCreditSuppliesByDate(url, from, to)
   )

   const { trigger: updateSupply, isMutating: updatingSupply } = useSWRMutation(
      '/supply/status',
      updateSupplyMutation
   )

   useEffect(() => {
      const tableData =
         data?.data && data?.data.length > 0
            ? data?.data.map((d) => ({
                 supplyId: d.supplyId,
                 supplier: d.supplier,
                 status: d.status,
                 createdBy: d.createdBy,
                 createdAt: d.createdAt,
                 withdrawnBy: d.withdrawnBy,
                 withdrawnAt: d.withdrawnAt,
                 amount: d.amount,
              }))
            : []
      if (unselectedDate || shouldRefetch) {
         setTblData(tableData)
      }
   }, [data?.data, shouldRefetch, unselectedDate])

   const handleUpdateInvoice = async (supplyId: string) => {
      await updateSupply(
         { supplyId },
         {
            onSuccess: (data) => {
               showNotification({
                  message: data.data.message,
                  icon: <IconCheck />,
                  color: 'teal',
               })
               refetch()
            },
         }
      )
   }

   return (
      <PosTable
         data={tblData}
         loading={isLoading || updatingSupply}
         dateValue={value}
         setDate={setValue}
         title="Credit Supplies"
         excludeFields={[]}
         updateInvoice={handleUpdateInvoice}
      />
   )
}

export default CreditSupplyTable
