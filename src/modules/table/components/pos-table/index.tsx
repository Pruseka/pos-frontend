import { ActionIcon, Box, Flex, Group, Loader, ScrollArea, Table, Text } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { CategoryActionFormType } from '../category-table'
import FormModal from '../form-modal'

type Item = {
   [key: string]: string | number | Date | { value: string; label: string }[]
}

interface TableProps {
   data?: Item[]
   loading: boolean
   title: string
   action?: boolean
   forms: CategoryActionFormType
}

const PosTable: React.FC<TableProps> = ({ data, loading, title, action, forms }) => {
   const [opened, setOpened] = useState(false)

   if (loading)
      return (
         <Flex p="xl" justify="center" align="center" style={{ width: '100%' }}>
            <Loader />
         </Flex>
      )

   if (!data) {
      return <h1>No Data Found</h1>
   }

   const handleClickEdit = () => {
      setOpened(true)
   }

   const columns = Object.keys(data[0])

   const rows = data?.map((item) => (
      <tr key={Math.random().toString()}>
         {Object.entries(item).map(([key, value]) => (
            <td key={key}>
               <Text size="sm" weight={500}>
                  {`${value}`}
               </Text>
            </td>
         ))}

         {action && (
            <td>
               <Group spacing={0} position="right">
                  <ActionIcon onClick={handleClickEdit}>
                     <IconPencil size={16} stroke={1.5} />
                  </ActionIcon>

                  <ActionIcon color="red">
                     <IconTrash size={16} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </td>
         )}
      </tr>
   ))

   return (
      <>
         <ScrollArea sx={{ width: '100%' }}>
            <Box p="md">
               <Text
                  fz="lg"
                  fw={600}
                  sx={(theme) => ({
                     padding: theme.spacing.xs,
                     paddingBottom: theme.spacing.xl,
                  })}
               >
                  {`${title} Table`}
               </Text>
               <Table verticalSpacing="sm" sx={{ minWidth: 600 }}>
                  <thead key="head">
                     <tr>
                        {columns.map((columnName) => (
                           <th key={columnName}>{columnName}</th>
                        ))}
                        <th />
                     </tr>
                  </thead>
                  <tbody>{rows}</tbody>
               </Table>
            </Box>
         </ScrollArea>
         <FormModal title="Update Customer" forms={forms} opened={opened} onClose={() => setOpened(false)} />
      </>
   )
}

export default PosTable
