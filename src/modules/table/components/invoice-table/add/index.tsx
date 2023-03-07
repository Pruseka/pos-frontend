import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { Box, Flex, Text } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { IconArrowNarrowLeft, IconCheck } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'
import CustomerForm, { FormValues } from './customer-form'
import InvoiceForm from './invoice-form'
import useStyles from './styles'
import PosTable from './table'
import { createInvoiceMutation } from '../../../../../api/invoice/mutations/createInvoice'
import { showNotification } from '@mantine/notifications'

export type Item = {
   no: number
   itemId: string
   code: string
   name: string
   qty: number
   price: number
   netAmount: number
}

const AddInvoice: React.FC = () => {
   const { classes } = useStyles()
   const [items, setItems] = useState<Item[]>([])
   const [selectedItem, setSelectedItem] = useState<Item | null>(null)
   const [isEditing, setIsEditing] = useState(false)
   const { trigger: createInvoice, isMutating: creatingInvoice } = useSWRMutation(
      '/invoice',
      createInvoiceMutation
   )

   const backButton = (
      <Box pl="xl">
         <NavLink to="/invoices" className={classes.backLink}>
            <Text>
               <Flex align="center" gap="xs">
                  <IconArrowNarrowLeft size={14} />
                  Back to all invoices
               </Flex>
            </Text>
         </NavLink>
      </Box>
   )

   const handleAddRow = (item: Item) => {
      setItems((prev) => [...prev, item])
   }

   const handleUpdateRow = (item: Item) => {
      const newItems = items.map((it) => {
         if (it.no === item.no) {
            return item
         }
         return it
      })
      setItems(newItems)
      setIsEditing(false)
      setSelectedItem(null)
   }

   const handleSelectItem = (item: Item) => {
      setSelectedItem(item)
      setIsEditing(true)
   }

   const handleDeleteItem = (item: Item) => {
      setItems((prev) => prev.filter((it) => it.no !== item.no))
      if (item.no === selectedItem?.no) {
         setSelectedItem(null)
         setIsEditing(false)
      }
   }

   const cancelUpdate = () => {
      setSelectedItem(null)
      setIsEditing(false)
   }

   const handleCreateInvoice = async (values: FormValues) => {
      const mappedItems = items.map((item) => ({ itemId: item.itemId, qty: item.qty }))
      await createInvoice(
         { ...values, items: mappedItems },
         {
            onSuccess: (data) =>
               showNotification({
                  message: data.data.message,
                  icon: <IconCheck />,
                  color: 'teal',
               }),
         }
      )
   }

   useHotkeys([
      ['ctrl+Enter', () => console.log('saved')],
      ['alt+D', () => console.log('discard')],
   ])

   return (
      <Box p={{ base: 'xs', md: 'xl' }} className={classes.container}>
         {backButton}
         <Flex direction={{ base: 'column-reverse', md: 'column' }}>
            <CustomerForm submitForm={handleCreateInvoice} />

            <Flex
               direction={{ base: 'column-reverse', md: 'row' }}
               align={{ base: 'center', md: 'normal' }}
               gap="xl"
               p="xl"
               w="100%"
            >
               <PosTable
                  data={items}
                  loading={false}
                  title="Items"
                  updateRow={handleSelectItem}
                  deleteRow={handleDeleteItem}
                  excludeFields={['itemId']}
               />

               <InvoiceForm
                  addRow={handleAddRow}
                  isEditing={isEditing}
                  item={selectedItem}
                  loading={false}
                  updateRow={handleUpdateRow}
                  newId={items.length > 0 ? items[items.length - 1].no + 1 : 1}
                  cancelUpdate={cancelUpdate}
               />
            </Flex>
         </Flex>
      </Box>
   )
}

export default AddInvoice
