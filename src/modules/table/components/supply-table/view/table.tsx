import {
   ActionIcon,
   Badge,
   Box,
   Flex,
   Group,
   Loader,
   Pagination,
   ScrollArea,
   Table,
   Text,
} from '@mantine/core'
import { IconPackage, IconPencil, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Item } from '../../../../../api/invoice/queries/getInvoiceById'
import { Badge as CustomerBadge, CustomerTypeBadges } from '../../customer-table/table'
import useStyles from './styles'

interface TableProps {
   data: Item[]
   loading: boolean
   title: string
   excludeFields: string[]
}

const PosTable: React.FC<TableProps> = ({ data, loading, title, excludeFields }) => {
   const { classes, cx } = useStyles()
   const [activePage, setActivePage] = useState(1)

   const rowsPerPage = 3
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const paginatedData = data.slice(startOffset, endOffset)

   const total = data.length > 0 ? Math.ceil(data.length / rowsPerPage) : 0

   const columns = ['Code', 'Name', 'Category', 'Qty', 'Price', 'Net Amount']

   const currencyRows = ['amount', 'price']
   const numberRows = [...currencyRows, 'no', 'qty']
   const numberColumns = ['No', 'Price', 'Qty', 'Net Amount']
   const totalAmount = data.map((item) => +item.amount).reduce((previous, current) => previous + current, 0)

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
                        <Badge color={CustomerTypeBadges?.[value as CustomerBadge] as any}>{value}</Badge>
                     </td>
                  )
               }

               if (key === 'price' && typeof value !== 'string' && typeof value !== 'number') {
                  return (
                     <td key={key} className={classes.number}>{`${(value as any).toLocaleString()} Ks`}</td>
                  )
               }

               if (value === '') return <td key={key}>-</td>
               return (
                  <td
                     key={key}
                     className={cx({
                        [classes.number]: numberRows.includes(key),
                     })}
                  >{`${value} ${currencyRows.includes(key) ? 'Ks' : ''}`}</td>
               )
            })}
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
            <Box className={classes.tableTop} p="lg" />
            <ScrollArea>
               <Table miw={800} withBorder fontSize="sm" verticalSpacing="md" className={classes.table}>
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
