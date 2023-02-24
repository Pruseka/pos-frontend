import { ActionIcon, Box, Flex, Group, Loader, ScrollArea, Table, Text } from '@mantine/core'
import { openModal, closeModal } from '@mantine/modals'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useCallback, useEffect, useState } from 'react'
import { toSentenceCase } from '../../../../helpers/conver-title'
import { CategoryActionFormType } from '../category-table'
import FormModal from '../form-modal'
import useStyles from './styles'

export type Item = {
   [key: string]: string | number | Date | { value: string; label: string }[]
}

interface TableProps {
   data?: Item[]
   loading: boolean
   title: string
   action: { update?: boolean; delete?: boolean }
   forms: CategoryActionFormType
   updateRow: (values: { [key: string]: unknown }) => void
   refetch: () => void
}

const PosTable: React.FC<TableProps> = ({ data, loading, title, action, forms, updateRow, refetch }) => {
   const { classes } = useStyles()
   const [isEditing, setIsEditing] = useState(false)
   const [item, setItem] = useState<Item | null>(null)

   const openFormModal = (item: Item) => {
      setIsEditing(true)
      setItem(item)
   }

   const closeFormModal = useCallback(() => {
      setIsEditing(false)
      setItem(null)
      closeModal(title)
   }, [title])

   const handleUpdate = useCallback(
      async <T extends { [key: string]: unknown }>(values: T) => {
         updateRow(values)
         closeFormModal()
         refetch()
      },
      [closeFormModal, refetch, updateRow]
   )

   useEffect(() => {
      if (isEditing && item) {
         openModal({
            title: `${isEditing ? 'Update' : 'Add'} ${title}`,
            modalId: title,
            children: <FormModal forms={forms} item={item} isEditing={isEditing} updateRow={handleUpdate} />,
            centered: true,
            size: 'sm',
            onClose: () => {
               setIsEditing(false)
               setItem(null)
            },
         })
      }
   }, [isEditing, item, forms, handleUpdate, title, closeFormModal])

   if (loading)
      return (
         <Flex p="xl" justify="center" align="center" style={{ width: '100%' }}>
            <Loader />
         </Flex>
      )

   if (!data) {
      return <h1>No Data Found</h1>
   }

   const columns = Object.keys(data[0])

   const rows = data?.map((item) => {
      return (
         <tr key={Math.random().toString()}>
            {Object.entries(item).map(([key, value]) => (
               <td key={key}>{`${value}`}</td>
            ))}

            <td>
               <Group spacing={0} position="right">
                  {action?.update && (
                     <ActionIcon onClick={() => openFormModal(item)}>
                        <IconPencil size={16} stroke={1.5} />
                     </ActionIcon>
                  )}

                  {action?.delete && (
                     <ActionIcon color="red">
                        <IconTrash size={16} stroke={1.5} />
                     </ActionIcon>
                  )}
               </Group>
            </td>
         </tr>
      )
   })

   return (
      <>
         <ScrollArea sx={{ width: '100%' }}>
            <Box p="md">
               <Text fw="bold" fz="md" className={classes.title}>
                  {title}
               </Text>
               <Table sx={{ minWidth: 600 }} striped fontSize="sm" verticalSpacing="sm">
                  <thead key="head">
                     <tr>
                        {columns.map((columnName) => (
                           <th key={columnName}>{toSentenceCase(columnName)}</th>
                        ))}
                        <th />
                     </tr>
                  </thead>
                  <tbody>{rows}</tbody>
               </Table>
            </Box>
         </ScrollArea>
      </>
   )
}

export default PosTable
