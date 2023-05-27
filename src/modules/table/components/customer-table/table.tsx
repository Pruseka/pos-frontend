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
   TextInput,
} from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { openModal, closeModal } from '@mantine/modals'
import {
   IconBuildingFactory2,
   IconBuildingStore,
   IconPackage,
   IconPencil,
   IconSearch,
} from '@tabler/icons-react'
import { useCallback, useEffect, useState } from 'react'
import { GetAllCustomersData } from '../../../../api/customer/queries/getAllCustomers'
import { toSentenceCase } from '../../../../helpers/conver-title'
import FormModal from './form-modal'
import useStyles from './styles'
import { CSVLink } from 'react-csv'

export type Item = Partial<GetAllCustomersData[0]>

export const CustomerTypeBadges = {
   retail: <IconBuildingStore size={14} color="blue" />,
   wholesales: <IconBuildingFactory2 size={14} color="teal" />,
}

export type Badge = keyof typeof CustomerTypeBadges

interface TableProps {
   data: Item[]
   loading: boolean
   formSubmitting: boolean
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
   updateRow: (values: { [key: string]: unknown }) => Promise<void>
   addRow: (values: { [key: string]: unknown }) => Promise<void>
   refetch: () => Promise<void>
}

const PosTable: React.FC<TableProps> = ({
   data,
   loading,
   formSubmitting,
   title,
   excludeFields,
   updateRow,
   addRow,
   refetch,
}) => {
   const { classes, cx } = useStyles()
   const [isEditing, setIsEditing] = useState(false)
   const [openActionForm, setOpenActionForm] = useState(false)
   const [item, setItem] = useState<Item | null>(null)
   const [activePage, setActivePage] = useState(1)
   const [q, setQ] = useDebouncedState('', 200)

   const rowsPerPage = 5
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const query = q.toLowerCase().trim()
   const searchedData = data.filter((customer) => customer.name?.toLowerCase().includes(query))
   const paginatedData = searchedData.slice(startOffset, endOffset)
   const total = searchedData.length > 0 ? Math.ceil(searchedData.length / rowsPerPage) : 0

   const openUpdateFormModal = (item: Item) => {
      setOpenActionForm(true)
      setIsEditing(true)
      setItem(item)
   }

   const handleAdd = useCallback(
      async <T extends { [key: string]: unknown }>(values: T) => {
         await addRow(values)
         await refetch()
         closeModal(title)
      },
      [addRow, refetch, title]
   )

   const handleUpdate = useCallback(
      async <T extends { [key: string]: unknown }>(values: T) => {
         await updateRow(values)
         await refetch()
         closeModal(title)
      },
      [refetch, title, updateRow]
   )

   console.count('customer table')

   useEffect(() => {
      if (openActionForm) {
         if (isEditing && item) {
            openModal({
               title: `${isEditing ? 'Update' : 'Add'} ${title}`,
               modalId: title,
               children: (
                  <FormModal
                     item={item}
                     isEditing={isEditing}
                     loading={formSubmitting}
                     updateRow={handleUpdate}
                     addRow={async () => {}}
                  />
               ),
               centered: true,
               size: 'sm',

               onClose: () => {
                  setOpenActionForm(false)
                  setIsEditing(false)
                  setItem(null)
               },
            })
            return
         }

         openModal({
            title: `${isEditing ? 'Update' : 'Add'} ${title}`,
            modalId: title,
            children: (
               <FormModal
                  item={null}
                  isEditing={isEditing}
                  loading={formSubmitting}
                  updateRow={async () => {}}
                  addRow={handleAdd}
               />
            ),
            centered: true,
            size: 'sm',
            overflow: 'inside',
            onClose: () => {
               setOpenActionForm(false)
            },
         })
      }
   }, [isEditing, item, handleUpdate, title, openActionForm, handleAdd, formSubmitting])

   const columns = Object.keys(data[0] || {})

   const rows = paginatedData?.map((item) => {
      return (
         <tr key={Math.random().toString()}>
            {Object.entries(item).map(([key, value]) => {
               if (excludeFields.find((field) => field === key)) {
                  return null
               }

               if (key === 'type' && value in CustomerTypeBadges) {
                  return (
                     <td key={key}>
                        <Text>
                           <Flex align="center" gap="xs">
                              {CustomerTypeBadges?.[value as Badge]}
                              {value}
                           </Flex>
                        </Text>
                     </td>
                  )
               }

               if (value === '') return <td key={key}>-</td>
               return <td key={key}>{`${value}`}</td>
            })}

            <td>
               <Group spacing={0} position="right">
                  <ActionIcon onClick={() => openUpdateFormModal(item)}>
                     <IconPencil size={16} stroke={1.5} />
                  </ActionIcon>

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
         <Flex p="xl" justify="center" align="center" sx={{ width: '100%' }}>
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
                     filename={`customers-table.csv`}
                  >
                     Export
                  </CSVLink>
               </Button>
            </Flex>

            <Flex
               className={cx(classes.tableActions, { [classes.borderBottom]: paginatedData.length === 0 })}
               p="lg"
               justify="flex-end"
               align={{ xs: 'stretch', base: 'flex-start' }}
               direction={{ xs: 'row', base: 'column-reverse' }}
               gap={{ xs: 0, base: 'md' }}
            >
               <TextInput
                  icon={<IconSearch size={20} stroke={1.5} />}
                  mx={{ base: 0, xs: 'md' }}
                  className={classes.input}
                  placeholder="Search By Customer Name"
                  defaultValue={q}
                  onChange={(e) => setQ(e.currentTarget.value)}
                  size="md"
                  radius="md"
               />
               <Button h={40} onClick={() => setOpenActionForm(true)}>{`Add ${title}`}</Button>
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
