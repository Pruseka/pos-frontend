import {
   ActionIcon,
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
import { closeModal, openModal } from '@mantine/modals'
import { IconLock, IconPackage, IconPencil, IconSearch } from '@tabler/icons-react'
import { useCallback, useEffect, useState } from 'react'
import { GetAllUsersData } from '../../../../api/user/queries/getAllUsers'
import { toSentenceCase } from '../../../../helpers/conver-title'
import FormModal from './form-modal'
import PasswordFormModal from './password-form-modal'
import useStyles from './styles'

export type Item = Partial<GetAllUsersData[0]>

interface TableProps {
   data: Item[]
   loading: boolean
   formSubmitting: boolean
   updatingPassword: boolean
   title: string
   excludeFields: string[]
   updateRow: (values: { [key: string]: unknown }) => Promise<void>
   addRow: (values: { [key: string]: unknown }) => Promise<void>
   updatePassword: (values: { [key: string]: unknown }) => Promise<void>

   refetch: () => Promise<void>
}

const PosTable: React.FC<TableProps> = ({
   data,
   loading,
   formSubmitting,
   updatingPassword,
   title,
   excludeFields,
   updateRow,
   updatePassword,
   addRow,
   refetch,
}) => {
   const { classes, cx } = useStyles()
   const [isEditing, setIsEditing] = useState(false)
   const [openEditForm, setOpenEditForm] = useState(false)
   const [openEditPasswordForm, setOpenEditPasswordForm] = useState(false)
   const [item, setItem] = useState<Item | null>(null)
   const [activePage, setActivePage] = useState(1)
   const [q, setQ] = useDebouncedState('', 200)

   const rowsPerPage = 3
   const endOffset = rowsPerPage * activePage
   const startOffset = endOffset - rowsPerPage
   const query = q.toLowerCase().trim()
   const searchedData = data.filter((user) => user.name?.toLowerCase().includes(query))
   const paginatedData = searchedData.slice(startOffset, endOffset)
   const total = searchedData.length > 0 ? Math.ceil(searchedData.length / rowsPerPage) : 0

   const columns = Object.keys(data[0] || {})

   const rows = paginatedData?.map((item) => {
      return (
         <tr key={Math.random().toString()}>
            {Object.entries(item).map(([key, value]) => {
               if (excludeFields.find((field) => field === key)) {
                  return null
               }

               if (value === '') return <td key={key}>-</td>
               return <td key={key}>{`${value}`}</td>
            })}

            <td>
               <Group spacing={10} position="right">
                  <ActionIcon onClick={() => openUpdateFormModal(item)}>
                     <IconPencil size={16} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon onClick={() => openUpdatePasswordFormModal(item)}>
                     <IconLock size={16} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </td>
         </tr>
      )
   })

   const openUpdateFormModal = (item: Item) => {
      setOpenEditForm(true)
      setIsEditing(true)
      setItem(item)
   }

   const openUpdatePasswordFormModal = (item: Item) => {
      setOpenEditPasswordForm(true)
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

   const handleUpdatePassword = useCallback(
      async <T extends { [key: string]: unknown }>(values: T) => {
         await updatePassword(values)
         await refetch()
         closeModal(`${title}-password`)
      },
      [refetch, title, updatePassword]
   )

   useEffect(() => {
      if (openEditForm) {
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
                  setOpenEditForm(false)
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
               setOpenEditForm(false)
            },
         })
      }
   }, [isEditing, item, handleUpdate, title, openEditForm, handleAdd, formSubmitting])

   useEffect(() => {
      if (openEditPasswordForm && item) {
         openModal({
            title: 'Update Password',
            modalId: `${title}-password`,
            children: (
               <PasswordFormModal
                  item={item}
                  loading={updatingPassword}
                  updatePassword={handleUpdatePassword}
               />
            ),
            centered: true,
            size: 'sm',

            onClose: () => {
               setOpenEditPasswordForm(false)
               setIsEditing(false)
               setItem(null)
            },
         })
      }
   }, [handleUpdatePassword, item, openEditPasswordForm, title, updatingPassword])

   if (loading)
      return (
         <Flex p="xl" justify="center" align="center" style={{ width: '100%' }}>
            <Loader />
         </Flex>
      )

   return (
      <Box p={{ base: 'sm', sm: 'xl' }}>
         <Box pt={{ base: 'xs', xs: 'md' }}>
            <Text fw="bold" fz="xl" className={classes.title}>
               {title}
            </Text>
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
                  placeholder="Search By User Name"
                  defaultValue={q}
                  onChange={(e) => setQ(e.currentTarget.value)}
                  size="md"
                  radius="md"
               />
               <Button h={40} onClick={() => setOpenEditForm(true)}>{`Add ${title}`}</Button>
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
         </Box>
         {total > 1 && (
            <Flex justify="flex-end" align="center" p="lg" className={classes.paginationWrapper}>
               <Pagination total={total} page={activePage} onChange={setActivePage} />
            </Flex>
         )}
      </Box>
   )
}

export default PosTable
