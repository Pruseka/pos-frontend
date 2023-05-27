import {
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
import { DatePicker } from '@mantine/dates'
import { useDebouncedState } from '@mantine/hooks'
import { IconPackage, IconSearch } from '@tabler/icons-react'
import React, { useState } from 'react'
import { GetSalesmanClosingStocksData } from '../../../../../api/salesman-stock/queries/getClosingStocks'
import { toSentenceCase } from '../../../../../helpers/conver-title'
import useStyles from './styles'
import { CSVLink } from 'react-csv'

export type Item = Partial<GetSalesmanClosingStocksData[0]>

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
   dateValue: Date
   customerId: string | null
   customers: {
      label: string
      value: string
   }[]
   setDate: React.Dispatch<React.SetStateAction<Date>>
   setCustomerId: React.Dispatch<React.SetStateAction<string | null>>
}

export const PaymentTypes = {
   cash: 'teal',
   credit: 'orange',
   return: 'blue',
   cancel: 'gray',
   damage: 'red',
}

export const StatusTypes = {
   paid: 'teal',
   unpaid: 'red',
}

export type PaymentBadge = keyof typeof PaymentTypes
export type StatusPin = keyof typeof StatusTypes

const PosTable: React.FC<TableProps> = ({
   data,
   loading,
   title,
   excludeFields,
   dateValue,
   setDate,
   customerId,
   setCustomerId,
   customers,
}) => {
   const { classes, cx } = useStyles()
   const [activePage, setActivePage] = useState(1)
   const rowsPerPage = 10
   const [q, setQ] = useDebouncedState('', 200)
   const query = q.toLowerCase().trim()
   const searchedData = data.filter((item) => item.name?.toLowerCase().includes(query))
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const paginatedData = searchedData.slice(startOffset, endOffset)

   const total = searchedData.length > 0 ? Math.ceil(searchedData.length / rowsPerPage) : 0

   const columns = Object.keys(data[0] || {})

   const rows = paginatedData.map((item) => {
      return (
         <tr key={item.itemId}>
            {Object.entries(item).map(([key, value]) => {
               if (excludeFields.find((field) => field === key)) {
                  return null
               }

               if (key === 'qty') {
                  return <td key={key} style={{ textAlign: 'right' }}>{`${value.toLocaleString()}`}</td>
               }

               if (value === '') return <td key={key}>-</td>
               return <td key={key}>{`${value}`}</td>
            })}

            <td>
               <Group spacing={0} position="right">
                  {/* <ActionIcon onClick={() => openUpdateFormModal(item)}>
                     <IconPencil size={16} stroke={1.5} />
                  </ActionIcon> */}

                  {/* {action?.delete && (
                      <ActionIcon color="red">
                         <IconTrash size={16} stroke={1.5} />
                      </ActionIcon>
                   )} */}
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
            <Flex justify="space-between" align="center">
               <Text fw="bold" fz="xl" className={classes.title}>
                  {title}
               </Text>
               <Button variant="outline" disabled={searchedData.length === 0}>
                  <CSVLink
                     data={searchedData}
                     style={{ textDecoration: 'none', color: 'inherit' }}
                     filename={`customer-closing-stocks-table.csv`}
                  >
                     Export
                  </CSVLink>
               </Button>
            </Flex>

            <Flex
               className={cx(classes.tableActions, { [classes.borderBottom]: paginatedData.length === 0 })}
               p="lg"
               justify="space-between"
               direction={{ base: 'column', xl: 'row' }}
               gap={{ md: 'sm', base: 'md' }}
            >
               <Flex gap="sm" align="center">
                  <DatePicker
                     placeholder="Pick dates range"
                     value={dateValue}
                     maxDate={new Date()}
                     onChange={setDate as any}
                     size="md"
                  />
                  <Select
                     data={customers}
                     sx={{ flex: 1 / 2 }}
                     size="md"
                     value={customerId}
                     onChange={setCustomerId}
                     searchable
                     classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                  />
               </Flex>

               <TextInput
                  icon={<IconSearch size={20} stroke={1.5} />}
                  mx={{ base: 0, xs: 'md' }}
                  className={classes.input}
                  placeholder="Search By Item Name"
                  defaultValue={q}
                  onChange={(e) => setQ(e.currentTarget.value)}
                  size="md"
                  radius="md"
               />
            </Flex>
            {paginatedData.length > 0 ? (
               <ScrollArea>
                  <Table miw={800} fontSize="sm" withBorder verticalSpacing="md" className={classes.table}>
                     <thead key="head">
                        <tr>
                           {columns.map((columnName) => {
                              if (excludeFields.find((field) => field === columnName)) {
                                 return null
                              }
                              if (columnName === 'qty') {
                                 return (
                                    <th key={columnName} style={{ textAlign: 'right' }}>
                                       {toSentenceCase(columnName)}
                                    </th>
                                 )
                              }
                              return <th key={columnName}>{toSentenceCase(columnName)}</th>
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
