import {
   ActionIcon,
   Badge,
   Box,
   Button,
   Collapse,
   Flex,
   Loader,
   Pagination,
   ScrollArea,
   Table,
   Text,
   TextInput,
} from '@mantine/core'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates'
import { useDebouncedState } from '@mantine/hooks'
import { IconPackage, IconPlus, IconSearch } from '@tabler/icons-react'
import moment from 'moment'
import React, { useState } from 'react'
import {
   GetWarehouseInvoiceRecordsData,
   InvoicesList,
} from '../../../../../api/warehouse/queries/getInvoiceRecords'
import useStyles from './styles'
import { CSVLink } from 'react-csv'

export type Item = Partial<GetWarehouseInvoiceRecordsData[0]>

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
   const [openedItemId, setOpenedItemId] = useState<string | null>(null)
   const [q, setQ] = useDebouncedState('', 200)
   const query = q.toLowerCase().trim()

   const searchedData = data.filter((item) => item.name?.toLowerCase().includes(query))

   const rowsPerPage = 10
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const paginatedData = searchedData.slice(startOffset, endOffset)

   const total = data.length > 0 ? Math.ceil(data.length / rowsPerPage) : 0

   const columns = ['Code', 'Name', 'Category', 'Qty']
   const childColumns = ['Invoice Id', 'Type', 'Customer', 'Qty', 'Created At']
   const childExcludeColumns = ['invoiceItemId']

   const getChildRows = (list: InvoicesList) => {
      return list.map((li) => (
         <tr key={Math.random().toString()}>
            <td />
            {Object.entries(li).map(([key, value]) => {
               if (childExcludeColumns.find((field) => field === key)) {
                  return null
               }
               if (key === 'type' && typeof value === 'string' && value in SupplyTypes) {
                  return (
                     <td key={key}>
                        <Badge color={SupplyTypes?.[value as SupplyTypeBadge]}>{value}</Badge>
                     </td>
                  )
               }

               if (key === 'createdAt' && moment(value).isValid()) {
                  return <td key={key}>{moment(value).format('LLL')}</td>
               }

               return <td key={key}>{`${value}`}</td>
            })}
         </tr>
      ))
   }
   const childColumnsElement = childColumns.map((column) => <th key={column}>{column}</th>)

   const getChildTable = (list: InvoicesList) => (
      <>
         <Table className={classes.childTable} verticalSpacing="sm">
            <thead>
               <tr>
                  <th />
                  {childColumnsElement}
               </tr>
            </thead>
            <tbody>{getChildRows(list)}</tbody>
         </Table>
      </>
   )

   const sortChildColumns = (list: InvoicesList) => {
      return list.map((li) => ({
         invoiceId: li.invoiceId,
         type: li.type,
         customer: li.customer,
         qty: li.qty,
         invoiceItemId: li.invoiceItemId,
         createdAt: li.createdAt,
      }))
   }

   const rows = paginatedData.map((item) => {
      return (
         <React.Fragment key={item.itemId}>
            <tr>
               <td colSpan={0}>
                  <ActionIcon
                     onClick={() => {
                        setOpenedItemId((prev) => (prev === item.itemId ? null : item.itemId!))
                     }}
                  >
                     <IconPlus
                        size={16}
                        stroke={1.5}
                        style={{
                           transform: openedItemId === item.itemId ? `rotate(45deg)` : 'none',
                           transition: 'all 0.1s linear',
                        }}
                     />
                  </ActionIcon>
               </td>
               {Object.entries(item).map(([key, value]) => {
                  if (excludeFields.find((field) => field === key)) {
                     return null
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

                  if (key === 'amount') {
                     return <td key={key} style={{ textAlign: 'right' }}>{`${value.toLocaleString()} Ks`}</td>
                  }

                  if (value === '') return <td key={key}>-</td>
                  return <td key={key}>{`${value}`}</td>
               })}

               <td />
            </tr>
            <tr>
               <td colSpan={9} style={{ padding: 0, border: 0 }}>
                  <Collapse in={openedItemId === item.itemId}>
                     {getChildTable(sortChildColumns(item.list!))}
                  </Collapse>
               </td>
            </tr>
         </React.Fragment>
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
                     filename={`warehouse-invoice-records-table.csv`}
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
               <DateRangePicker
                  allowSingleDateInRange
                  placeholder="Pick dates range"
                  value={dateValue}
                  maxDate={new Date()}
                  sx={{ flex: 1 }}
                  onChange={setDate}
                  size="md"
               />

               <TextInput
                  icon={<IconSearch size={20} stroke={1.5} />}
                  className={classes.input}
                  placeholder="Search By Item Name"
                  defaultValue={q}
                  onChange={(e) => setQ(e.currentTarget.value)}
                  radius="md"
                  size="md"
               />
            </Flex>
            {paginatedData.length > 0 ? (
               <ScrollArea>
                  <Table miw={1000} fontSize="sm" withBorder verticalSpacing="md" className={classes.table}>
                     <thead key="head">
                        <tr>
                           <th />
                           {columns.map((columnName) => {
                              if (excludeFields.find((field) => field === columnName)) {
                                 return null
                              }
                              if (columnName === 'Amount') {
                                 return (
                                    <th key={columnName} style={{ textAlign: 'right' }}>
                                       {columnName}
                                    </th>
                                 )
                              }
                              return <th key={columnName}>{columnName}</th>
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
