import { Badge, Box, Button, Flex, Group, Loader, Pagination, ScrollArea, Table, Text } from '@mantine/core'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates'
import { IconPackage } from '@tabler/icons-react'
import { useState } from 'react'
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

const PosTable: React.FC<TableProps> = ({ data, loading, title, excludeFields, dateValue, setDate }) => {
   const { classes } = useStyles()
   const [activePage, setActivePage] = useState(1)
   const navigate = useNavigate()
   const rowsPerPage = 3
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const paginatedData = data.slice(startOffset, endOffset)

   const total = data.length > 0 ? Math.ceil(data.length / rowsPerPage) : 0

   const columns = Object.keys(data[0] || {})

   const rows = paginatedData.map((item) => {
      return (
         <tr key={Math.random().toString()}>
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
      <>
         <ScrollArea sx={{ width: '100%' }}>
            <Box p="md">
               <Text fw="bold" fz="xl" className={classes.title}>
                  {title}
               </Text>
               <Flex style={{ width: '100%' }} py="lg" justify="flex-end" align="end">
                  <DateRangePicker
                     label="Book hotel"
                     placeholder="Pick dates range"
                     value={dateValue}
                     mx="md"
                     sx={{ width: 300 }}
                     onChange={setDate}
                  />

                  <Button
                     onClick={() => {
                        navigate('/invoices/add')
                     }}
                  >{`Add ${title}`}</Button>
               </Flex>
               {paginatedData.length > 0 ? (
                  <Table sx={{ minWidth: 600 }} striped fontSize="sm" verticalSpacing="sm">
                     <thead key="head">
                        <tr>
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
               ) : (
                  <Flex direction="column" justify="center" align="center" className={classes.empty}>
                     <IconPackage size={56} stroke={1.5} />
                     <Text fz="md">No Data Found</Text>
                  </Flex>
               )}
            </Box>
            {total > 1 && (
               <Flex justify="flex-end" align="center" p="lg">
                  <Pagination total={total} page={activePage} onChange={setActivePage} />
               </Flex>
            )}
         </ScrollArea>
      </>
   )
}

export default PosTable
