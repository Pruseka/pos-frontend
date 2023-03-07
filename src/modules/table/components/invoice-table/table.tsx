import React, { useState } from 'react'
import {
   ActionIcon,
   Badge,
   Box,
   Button,
   Collapse,
   Flex,
   Group,
   Loader,
   Pagination,
   ScrollArea,
   Table,
   Text,
} from '@mantine/core'
import { DateRangePickerValue } from '@mantine/dates'
import { IconPackage, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { GetAllInvoicesData } from '../../../../api/invoice/queries/getInvoicesByDate'
import { toSentenceCase } from '../../../../helpers/conver-title'
import { Badge as CustomerBadge, CustomerTypeBadges } from '../customer-table/table'
import useStyles from './styles'

export type Item = Partial<GetAllInvoicesData[0]>

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

export const PaymentTypes = {
   cash: 'teal',
   credit: 'orange',
   return: 'blue',
   cancel: 'gray',
   damage: 'red',
}

export type PaymentBadge = keyof typeof PaymentTypes

const PosTable: React.FC<TableProps> = ({ data, loading, title, excludeFields, dateValue, setDate }) => {
   const { classes } = useStyles()
   const [activePage, setActivePage] = useState(1)
   const navigate = useNavigate()
   const rowsPerPage = 10
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const paginatedData = data.slice(startOffset, endOffset)
   const [openedId, setOpenedId] = useState<string | null>(null)

   const total = data.length > 0 ? Math.ceil(data.length / rowsPerPage) : 0

   const columns = Object.keys(data[0] || {})

   const c = ['Name', 'Qty', 'Price', 'Net Amount']

   const d = [
      { name: 'Ice Cream', qty: 4, price: 1000, netAmount: 5000 },
      { name: 'Ice Cream', qty: 4, price: 1000, netAmount: 5000 },
   ]

   const g = c.map((c) => <th key={c}>{c}</th>)

   const z = d.map((item) => {
      return (
         <tr key={Math.random().toString()}>
            <td />
            {Object.entries(item).map(([key, value]) => {
               return <td key={key}>{`${value}`}</td>
            })}
         </tr>
      )
   })

   const childTable = (
      <>
         <Table className={classes.childTable} verticalSpacing="sm">
            <thead>
               <tr>
                  <th />
                  {g}
               </tr>
            </thead>
            <tbody>{z}</tbody>
         </Table>
      </>
   )

   const rows = paginatedData.map((item) => {
      return (
         <React.Fragment key={item.invoiceId}>
            <tr>
               <td colSpan={0}>
                  <ActionIcon
                     onClick={() => {
                        setOpenedId((prev) => (prev === item.invoiceId ? null : item.invoiceId!))
                     }}
                  >
                     <IconPlus
                        size={16}
                        stroke={1.5}
                        style={{
                           transform: openedId === item.invoiceId ? `rotate(45deg)` : 'none',
                           transition: 'all 0.1s linear',
                        }}
                     />
                  </ActionIcon>
               </td>
               {Object.entries(item).map(([key, value]) => {
                  if (excludeFields.find((field) => field === key)) {
                     return null
                  }

                  if (key === 'customerType' && typeof value === 'string' && value in CustomerTypeBadges) {
                     return (
                        <td key={key}>
                           <Badge color={CustomerTypeBadges?.[value as CustomerBadge]}>{value}</Badge>
                        </td>
                     )
                  }

                  if (key === 'type' && typeof value === 'string' && value in PaymentTypes) {
                     return (
                        <td key={key}>
                           <Flex align="center" gap="xs">
                              <Box
                                 sx={(theme) => ({
                                    borderRadius: '50%',
                                    backgroundColor: theme.colors[PaymentTypes?.[value as PaymentBadge]][3],
                                 })}
                                 w={6}
                                 h={6}
                              />
                              {value}
                           </Flex>
                        </td>
                     )
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
            <tr>
               <td colSpan={8} style={{ padding: 0, border: 0 }}>
                  <Collapse in={openedId === item.invoiceId}>{childTable}</Collapse>
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
            <Text fw="bold" fz="xl" className={classes.title}>
               {title}
            </Text>
            <Flex
               className={classes.tableActions}
               p="lg"
               justify="flex-end"
               align={{ xs: 'stretch', base: 'flex-start' }}
               direction={{ xs: 'row', base: 'column-reverse' }}
               gap={{ xs: 0, base: 'md' }}
            >
               <Button
                  onClick={() => {
                     navigate('/invoices/add')
                  }}
               >{`Add ${title}`}</Button>
            </Flex>
            {paginatedData.length > 0 ? (
               <ScrollArea>
                  <Table miw={800} fontSize="sm" withBorder verticalSpacing="md" className={classes.table}>
                     <thead key="head">
                        <tr>
                           <th />
                           {columns.map((columnName) => {
                              if (excludeFields.find((field) => field === columnName)) {
                                 return null
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
