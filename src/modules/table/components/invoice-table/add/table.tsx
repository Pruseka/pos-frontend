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
   Table,
   Text,
} from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { IconPackage, IconPencil, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Item } from '.'
import { GetAllInvoicesData } from '../../../../../api/invoice/queries/getInvoicesByDate'
import { toSentenceCase } from '../../../../../helpers/conver-title'
import { INVOICE_FORM_WIDTH } from '../../../../../lib/constants/layout'
import { CustomerTypeBadges, Badge as CustomerBadge } from '../../customer-table/table'
import useStyles from './styles'

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
   updateRow: (item: Item) => void
   deleteRow: (item: Item) => void
}

const PosTable: React.FC<TableProps> = ({ data, loading, title, updateRow, deleteRow, excludeFields }) => {
   const { classes } = useStyles()
   const [activePage, setActivePage] = useState(1)

   const rowsPerPage = 10
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const paginatedData = data.slice(startOffset, endOffset)

   const total = data.length > 0 ? Math.ceil(data.length / rowsPerPage) : 0

   const columns = ['No', 'Code', 'Name', 'Price', 'Qty', 'Net Amount']
   const totalAmount = data
      .map((item) => +item.netAmount)
      .reduce((previous, current) => previous + current, 0)

   const handleEdit = (item: Item) => {
      updateRow(item)
   }

   const handleDelete = (item: Item) => {
      deleteRow(item)
   }

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

               if (key === 'price' || key === 'netAmount') {
                  return <td key={key}>{`${value.toLocaleString()} Ks`}</td>
               }

               if (value === '') return <td key={key}>-</td>
               return <td key={key}>{`${value}`}</td>
            })}

            <td>
               <Group spacing={0} position="right">
                  <ActionIcon onClick={() => handleEdit(item)}>
                     <IconPencil size={16} stroke={1.5} />
                  </ActionIcon>

                  <ActionIcon color="red" onClick={() => handleDelete(item)}>
                     <IconTrash size={16} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </td>
         </tr>
      )
   })

   if (loading)
      return (
         <Flex p="xl" justify="center" align="center" w="100%">
            <Loader />
         </Flex>
      )

   return (
      <Box mih={400} className={classes.itemsWrapper}>
         <Box p="md" h="100%" w="100%">
            <Text fw="bold" fz="xl" className={classes.title}>
               {title}
            </Text>

            <ScrollArea>
               <Table miw={800} striped fontSize="sm" verticalSpacing="sm">
                  <thead key="head">
                     <tr>
                        {columns.map((columnName) => {
                           if (excludeFields.find((field) => field === columnName)) {
                              return null
                           }
                           return <th key={columnName}>{columnName}</th>
                        })}
                        <th />
                     </tr>
                  </thead>
                  {paginatedData.length > 0 ? (
                     <tbody>{rows}</tbody>
                  ) : (
                     <tbody>
                        <tr>
                           <td colSpan={7}>
                              <Flex
                                 style={{ width: '100%' }}
                                 direction="column"
                                 justify="center"
                                 align="center"
                                 className={classes.empty}
                              >
                                 <IconPackage size={56} stroke={1.5} />
                                 <Text fz="md">No Data Found</Text>
                              </Flex>
                           </td>
                        </tr>
                     </tbody>
                  )}
               </Table>
            </ScrollArea>
            <Flex p="md" my="xl" className={classes.netAmountWrapper} justify="flex-end">
               <Text color="dimmed" size="md" fw="bold">
                  Total Amount: {totalAmount.toLocaleString()} Ks
               </Text>
            </Flex>
         </Box>
         {total > 1 && (
            <Flex justify="flex-end" align="center" p="lg">
               <Pagination total={total} page={activePage} onChange={setActivePage} />
            </Flex>
         )}
      </Box>
   )
}

export default PosTable
