import {
   ActionIcon,
   Badge,
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
import { IconEye, IconPackage, IconSearch } from '@tabler/icons-react'
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetAllSuppliesData, SupplyType } from '../../../../api/supply/queries/getSupplyByDate'
import { TransferItemList } from '../../../../api/transfer/queries/getTransfersByDate'
import { Badge as CustomerBadge, CustomerTypeBadges } from '../customer-table/table'
import useStyles from './styles'

export type Item = Partial<GetAllSuppliesData[0]>

interface TableProps {
   data: Item[]
   loading: boolean
   title: string
   //    forms: {
   //       [key: string]: {
   //          title?: string
   //          value: string | number | Date | { label: string; value: string }[]
   //          addRequired: boolean
   //          updateRequired: boolean
   //       }
   //    }
   excludeFields: string[]
   dateValue: DateRangePickerValue
   setDate: React.Dispatch<React.SetStateAction<DateRangePickerValue>>
}

export const SupplyTypes = {
   cash: 'teal',
   credit: 'orange',
   return: 'blue',
   cancel: 'gray',
}

export const StatusTypes = {
   paid: 'teal',
   unpaid: 'red',
}

export type SupplyTypeBadge = keyof typeof SupplyTypes
export type StatusPin = keyof typeof StatusTypes

const PosTable: React.FC<TableProps> = ({ data, loading, title, excludeFields, dateValue, setDate }) => {
   const { classes, cx } = useStyles()
   const [activePage, setActivePage] = useState(1)
   const [q, setQ] = useDebouncedState('', 200)
   const query = q.toLowerCase().trim()
   const [typeFilter, setTypeFilter] = useState<string | null>(null)
   const [salesmanFilter, setSalesmanFilter] = useState<string | null>(null)

   const mappedSalesmen = data.map((d) => d.createdBy!)
   const salesmen = mappedSalesmen.filter((item, i) => mappedSalesmen.indexOf(item) === i)

   const searchedData = data
      .filter((supply) => supply.supplier?.toLowerCase().includes(query))
      .filter((supply) => (typeFilter ? supply.type === typeFilter : supply))

   const navigate = useNavigate()
   const rowsPerPage = 10
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const paginatedData = searchedData.slice(startOffset, endOffset)

   const total = data.length > 0 ? Math.ceil(data.length / rowsPerPage) : 0

   const columns = ['Supply Id', 'Salesman', 'Type', 'Supplier', 'Amount', 'Created At']
   const currencyRows = ['amount']
   const numberRows = ['supplyId', ...currencyRows]
   const numberColumns = ['Amount', 'Supply Id']

   const paymentTypes = Object.values(SupplyType).map((type) => ({ label: type, value: type }))

   const totalAmount = data.reduce((previousAmount, item) => {
      switch (item.type) {
         case SupplyType.CASH:
         case SupplyType.CREDIT:
            return previousAmount + +item.amount!
         case SupplyType.CANCEL:
            return previousAmount - +item.amount!
         case SupplyType.RETURN:
            return previousAmount
         default:
            return previousAmount
      }
   }, 0)

   const handleViewSupply = (item: Item) => {
      navigate(`/supplies/view/${item.supplyId}`)
   }

   const rows = paginatedData.map((item) => {
      return (
         <tr key={item.supplyId}>
            {Object.entries(item).map(([key, value]) => {
               if (excludeFields.find((field) => field === key)) {
                  return null
               }

               if (key === 'customerType' && typeof value === 'string' && value in CustomerTypeBadges) {
                  return (
                     <td key={key}>
                        <Text>
                           <Flex align="center" gap="xs">
                              {CustomerTypeBadges?.[value as CustomerBadge]}
                              {value}
                           </Flex>
                        </Text>
                     </td>
                  )
               }

               if (key === 'type' && typeof value === 'string' && value in SupplyTypes) {
                  return (
                     <td key={key}>
                        <Badge color={SupplyTypes?.[value as SupplyTypeBadge]}>{value}</Badge>
                     </td>
                  )
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

               if (key === 'createdAt' && moment(value as any).isValid()) {
                  return <td key={key}>{moment(value as any).format('LLL')}</td>
               }

               if (value === '') return <td key={key}>-</td>
               return (
                  <td
                     key={key}
                     className={cx({
                        [classes.number]: numberRows.includes(key),
                     })}
                  >{`${currencyRows.includes(key) ? `${value.toLocaleString()} KS` : `${value}`}`}</td>
               )
            })}

            <td>
               <Group spacing={0} position="right">
                  <ActionIcon onClick={() => handleViewSupply(item)}>
                     <IconEye size={16} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </td>
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
            <Text fw="bold" fz="xl" className={classes.title}>
               {title}
            </Text>
            <Flex
               className={cx(classes.tableActions, { [classes.borderBottom]: paginatedData.length === 0 })}
               p="lg"
               direction={{ base: 'column', xl: 'row' }}
               gap={{ md: 'sm', base: 'md' }}
            >
               <Flex gap="sm" direction={{ base: 'column', xs: 'row' }} w="100%" sx={{ flex: 1 }}>
                  <DateRangePicker
                     placeholder="Pick dates range"
                     value={dateValue}
                     maxDate={new Date()}
                     sx={{ flex: 1 }}
                     onChange={setDate}
                     size="md"
                  />

                  <Select
                     data={paymentTypes}
                     sx={{ flex: 1 / 2 }}
                     size="md"
                     value={typeFilter}
                     onChange={setTypeFilter}
                     allowDeselect
                     classNames={{ label: classes.label, item: classes.label, input: classes.label }}
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
                  w="100%"
                  sx={{ flex: 3 / 4 }}
               >
                  <TextInput
                     icon={<IconSearch size={20} stroke={1.5} />}
                     className={classes.input}
                     placeholder="Search By Supplier Name"
                     defaultValue={q}
                     onChange={(e) => setQ(e.currentTarget.value)}
                     radius="md"
                     size="md"
                  />
                  <Button
                     onClick={() => {
                        navigate('/supplies/add')
                     }}
                     h={40}
                     className={classes.addButton}
                  >{`Add ${title}`}</Button>
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
            {paginatedData.length > 0 && (
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
            )}
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
