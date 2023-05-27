import {
   ActionIcon,
   Box,
   Button,
   Flex,
   Group,
   Loader,
   Pagination,
   ScrollArea,
   Select,
   Table,
   Text,
   TextInput,
} from '@mantine/core'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates'
import { useDebouncedState } from '@mantine/hooks'
import { IconArrowNarrowLeft, IconCoins, IconPackage, IconSearch } from '@tabler/icons-react'
import moment from 'moment'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GetAllCreditInvoicesData } from '../../../../../api/invoice/queries/getCreditInvoiceByDate'
import { PaymentType } from '../../../../../api/invoice/queries/getInvoicesByDate'
import { Status } from '../../../../../api/transfer/queries/getTransfersByDate'
import useStyles from './styles'
import { CSVLink } from 'react-csv'

export type Item = Partial<GetAllCreditInvoicesData[0]>

interface TableProps {
   data: Item[]
   loading: boolean
   title: string
   excludeFields: string[]
   dateValue: DateRangePickerValue
   setDate: React.Dispatch<React.SetStateAction<DateRangePickerValue>>
   updateInvoice: (invoiceId: string) => Promise<void>
}

export const StatusTypes = {
   paid: 'teal',
   unpaid: 'red',
}

export type StatusPin = keyof typeof StatusTypes

const PosTable: React.FC<TableProps> = ({
   data,
   loading,
   title,
   excludeFields,
   dateValue,
   updateInvoice,
   setDate,
}) => {
   const { classes, cx } = useStyles()
   const [activePage, setActivePage] = useState(1)
   const [q, setQ] = useDebouncedState('', 200)
   const query = q.toLowerCase().trim()
   const [salesmanFilter, setSalesmanFilter] = useState<string | null>(null)

   const mappedSalesmen = data.map((d) => d.createdBy!)
   const salesmen = mappedSalesmen.filter((item, i) => mappedSalesmen.indexOf(item) === i)

   const searchedData = data.filter((invoice) => invoice.customer?.toLowerCase().includes(query))

   const totalAmount = data.reduce((prev, currItm) => prev + +currItm.amount!, 0)

   const navigate = useNavigate()
   const rowsPerPage = 10
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const paginatedData = searchedData.slice(startOffset, endOffset)

   const total = data.length > 0 ? Math.ceil(data.length / rowsPerPage) : 0

   const columns = [
      'Invoice Id',
      'Customer',
      'Status',
      'Salesman',
      'Created At',
      'Received By',
      'Received At',
      'Amount',
   ]

   const currencyRows = ['amount']
   const numberRows = ['invoiceId', ...currencyRows]
   const numberColumns = ['Amount', 'Invoice Id']

   const handlePayInvoice = async (item: Item) => {
      await updateInvoice(item.invoiceId!.toString())
   }

   const rows = paginatedData.map((item) => {
      return (
         <tr key={item.invoiceId}>
            {Object.entries(item).map(([key, value]) => {
               if (excludeFields.find((field) => field === key)) {
                  return null
               }

               if (key === 'status' && typeof value === 'string' && value in StatusTypes) {
                  return (
                     <td key={key}>
                        <Flex align="center" gap="xs" sx={{ textTransform: 'capitalize' }}>
                           <Box
                              sx={(theme) => ({
                                 borderRadius: '50%',
                                 backgroundColor: theme.colors[StatusTypes?.[value as StatusPin]][6],
                                 height: 6,
                                 width: 6,
                              })}
                           ></Box>
                           {value}
                        </Flex>
                     </td>
                  )
               }

               if (key === 'amount') {
                  return <td key={key} style={{ textAlign: 'right' }}>{`${value!.toLocaleString()} Ks`}</td>
               }

               if ((key === 'createdAt' || key === 'receivedAt') && moment(value as any).isValid()) {
                  return <td key={key}>{moment(value as any).format('LLL')}</td>
               }

               if (value === '' || value === null) return <td key={key}>-</td>
               return (
                  <td
                     key={key}
                     className={cx({
                        [classes.number]: numberRows.includes(key),
                     })}
                  >{`${currencyRows.includes(key) ? `${value.toLocaleString()} Ks` : `${value}`}`}</td>
               )
            })}

            {item.status === Status.UNPAID ? (
               <td>
                  <Group spacing={0} position="right">
                     <ActionIcon onClick={() => handlePayInvoice(item)}>
                        <IconCoins size={16} stroke={1.5} />
                     </ActionIcon>

                     {/* {action?.delete && (
                      <ActionIcon color="red">
                         <IconTrash size={16} stroke={1.5} />
                      </ActionIcon>
                   )} */}
                  </Group>
               </td>
            ) : (
               <td />
            )}
         </tr>
      )
   })

   if (loading)
      return (
         <Flex p="xl" justify="center" align="center" style={{ width: '100%' }}>
            <Loader />
         </Flex>
      )

   return (
      <Box p={{ base: 'sm', sm: 'xl' }}>
         <Box py={{ base: 'xs', xs: 'md' }}>
            <Flex justify="space-between" align="center">
               <Text fw="bold" fz="xl" className={classes.title}>
                  {title}
               </Text>
               <Button variant="outline" disabled={searchedData.length === 0}>
                  <CSVLink
                     data={searchedData}
                     style={{ textDecoration: 'none', color: 'inherit' }}
                     filename={`credit-invoices-table.csv`}
                  >
                     Export
                  </CSVLink>
               </Button>
            </Flex>

            <Flex
               className={cx(classes.tableActions, { [classes.borderBottom]: paginatedData.length === 0 })}
               p="lg"
               direction={{ base: 'column', xl: 'row' }}
               gap={{ md: 'sm', base: 'md' }}
            >
               <Flex gap="sm" direction={{ base: 'column', xs: 'row' }} w="100%" sx={{ flex: 1 }}>
                  <DateRangePicker
                     allowSingleDateInRange
                     placeholder="Pick dates range"
                     value={dateValue}
                     maxDate={new Date()}
                     sx={{ flex: 1 }}
                     onChange={setDate}
                     size="md"
                  />

                  <Select
                     data={salesmen}
                     sx={{ flex: 1 / 2 }}
                     size="md"
                     value={salesmanFilter}
                     onChange={setSalesmanFilter}
                     allowDeselect
                     classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                  />
               </Flex>

               <Flex
                  direction={{ base: 'column', xs: 'row' }}
                  align={{ xs: 'center' }}
                  gap="sm"
                  justify={{ base: 'right' }}
                  w="100%"
                  sx={{ flex: 1 }}
               >
                  <TextInput
                     icon={<IconSearch size={20} stroke={1.5} />}
                     className={classes.input}
                     placeholder="Search By Customer Name"
                     defaultValue={q}
                     onChange={(e) => setQ(e.currentTarget.value)}
                     radius="md"
                     size="md"
                  />
               </Flex>
            </Flex>
            {paginatedData.length > 0 ? (
               <ScrollArea>
                  <Table miw={1000} fontSize="sm" withBorder verticalSpacing="md" className={classes.table}>
                     <thead key="head">
                        <tr>
                           {columns.map((columnName) => {
                              if (excludeFields.find((field) => field === columnName)) {
                                 return null
                              }

                              return (
                                 <th
                                    key={columnName}
                                    {...(numberColumns.includes(columnName)
                                       ? { style: { textAlign: 'right' } }
                                       : {})}
                                 >
                                    {columnName}
                                 </th>
                              )
                           })}
                           <th />
                        </tr>
                     </thead>
                     <tbody>{rows}</tbody>
                  </Table>
               </ScrollArea>
            ) : (
               <Flex direction="column" justify="center" align="center" className={classes.empty}>
                  <IconPackage size={56} stroke={1.5} />
                  <Text fz="md">No Data Found</Text>
               </Flex>
            )}
            <Flex
               p="md"
               className={cx(classes.totalAmountWrapper, {
                  [classes.roundedBottom]: !(total > 1),
               })}
               justify="flex-end"
            >
               <Text color="dimmed" size="md" fw="bold">
                  Total Amount: {totalAmount.toLocaleString()} Ks
               </Text>
            </Flex>
            {total > 1 && (
               <Flex justify="flex-end" align="center" p="lg" className={classes.paginationWrapper}>
                  <Pagination total={total} page={activePage} onChange={setActivePage} />
               </Flex>
            )}
         </Box>
      </Box>
   )
}

export default PosTable

// return (
//    <>
//       <ScrollArea sx={{ width: '100%' }}>
//          <Box p="md">
//             <Text fw="bold" fz="xl" className={classes.title}>
//                {title}
//             </Text>
//             <Flex style={{ width: '100%' }} py="lg" justify="flex-end" align="end">
//                <DateRangePicker
//                   label="Book hotel"
//                   placeholder="Pick dates range"
//                   value={dateValue}
//                   mx="md"
//                   sx={{ width: 300 }}
//                   onChange={setDate}
//                />

//                <Button
//                   onClick={() => {
//                      navigate('/invoices/add')
//                   }}
//                >{`Add ${title}`}</Button>
//             </Flex>
//             {paginatedData.length > 0 ? (
//                <Table sx={{ minWidth: 600 }} striped fontSize="sm" verticalSpacing="sm">
//                   <thead key="head">
//                      <tr>
//                         {columns.map((columnName) => {
//                            if (excludeFields.find((field) => field === columnName)) {
//                               return null
//                            }
//                            return <th key={columnName}>{toSentenceCase(columnName)}</th>
//                         })}
//                         <th />
//                      </tr>
//                   </thead>
//                   <tbody>{rows}</tbody>
//                </Table>
//             ) : (
//                <Flex direction="column" justify="center" align="center" className={classes.empty}>
//                   <IconPackage size={56} stroke={1.5} />
//                   <Text fz="md">No Data Found</Text>
//                </Flex>
//             )}
//          </Box>
//          {total > 1 && (
//             <Flex justify="flex-end" align="center" p="lg">
//                <Pagination total={total} page={activePage} onChange={setActivePage} />
//             </Flex>
//          )}
//       </ScrollArea>
//    </>
// )
