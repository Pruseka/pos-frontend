import { useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Text, UnstyledButton } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import InvoiceForm from './invoice-form'
import PosTable from './table'
import CustomerForm from './customer-form'
import { CustomerType } from '../../../../../api/customer/queries/getAllCustomers'
import { NavLink } from 'react-router-dom'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import useStyles from './styles'

export type Item = {
   no: number
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
   const [customerType, setCustomerType] = useState<CustomerType>(CustomerType.RETAIL)

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

   useHotkeys([
      ['ctrl+Enter', () => console.log('saved')],
      ['alt+D', () => console.log('discard')],
   ])

   return (
      <Box p="xl" className={classes.container}>
         {backButton}
         <CustomerForm setCustomerType={setCustomerType} />

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
               customerType={customerType}
               updateRow={handleUpdateRow}
               newId={items.length > 0 ? items[items.length - 1].no + 1 : 1}
               cancelUpdate={cancelUpdate}
            />
         </Flex>
      </Box>
   )
}

export default AddInvoice
