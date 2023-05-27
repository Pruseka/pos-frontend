import { Box, Flex, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useHotkeys } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconArrowNarrowLeft, IconCheck } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { CustomerType } from '../../../../../api/customer/queries/getAllCustomers'
import { createInvoiceMutation } from '../../../../../api/invoice/mutations/createInvoice'
import CustomerForm, { FormValues } from './customer-form'
import InvoiceForm, { invoiceFormItem } from './invoice-form'
import useStyles from './styles'
import PosTable from './table'

export type Item = {
   no: number
   itemId: string
   code: string
   name: string
   qty: number
   price: { retail: number; wholesales: number }
   netAmount: number
}

const AddInvoice: React.FC = () => {
   const { classes } = useStyles()
   const navigate = useNavigate()
   const [items, setItems] = useState<Item[]>([])
   const [selectedItem, setSelectedItem] = useState<Item | null>(null)

   const [customerType, setCustomerType] = useState<CustomerType>(CustomerType.RETAIL)
   const [isEditing, setIsEditing] = useState(false)
   const { trigger: createInvoice, isMutating: creatingInvoice } = useSWRMutation(
      '/invoice',
      createInvoiceMutation
   )

   const backButton = (
      <Box pl="xl">
         <NavLink to="/" className={classes.backLink}>
            <Text>
               <Flex align="center" gap="xs">
                  <IconArrowNarrowLeft size={14} />
                  Back to all invoices
               </Flex>
            </Text>
         </NavLink>
      </Box>
   )

   const handleAddRow = (item: invoiceFormItem) => {
      const existingItemIndex = items.findIndex((it) => it.itemId === item.itemId)
      const netAmount =
         customerType === CustomerType.RETAIL
            ? item.price.retail * item.qty
            : item.price.wholesales * item.qty

      if (existingItemIndex !== -1) {
         setItems((prev) =>
            prev.map((itm, i) => {
               if (i === existingItemIndex) {
                  const newQty = itm.qty + item.qty!

                  const newNetAmount = itm.netAmount + netAmount
                  return {
                     ...itm,
                     qty: newQty,
                     netAmount: newNetAmount,
                  }
               }
               return itm
            })
         )
         return
      }
      setItems((prev) => [...prev, { ...item, netAmount }])
   }

   const handleUpdateRow = (item: invoiceFormItem) => {
      const newItems = items.map((it) => {
         if (it.no === item.no) {
            return {
               ...item,
               netAmount:
                  customerType === CustomerType.RETAIL
                     ? item.price.retail * item.qty
                     : item.price.wholesales * item.qty,
            }
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
         { ...values, customerType, items: mappedItems },
         {
            onSuccess: (data) => {
               showNotification({
                  message: data.data.message,
                  icon: <IconCheck />,
                  color: 'teal',
               })
               const invoiceId = data?.data?.data.invoiceId
               navigate(`/invoices/view/${invoiceId}`)
            },
         }
      )
   }

   useEffect(() => {
      if (customerType) {
         setItems((prev) =>
            prev.map((item) => ({
               ...item,
               netAmount:
                  customerType === CustomerType.RETAIL
                     ? item.price.retail * item.qty
                     : item.price.wholesales * item.qty,
            }))
         )
      }
   }, [customerType])

   useHotkeys([
      ['ctrl+Enter', () => console.log('saved')],
      ['alt+D', () => console.log('discard')],
   ])

   return (
      <Box p={{ base: 'xs', md: 'xl' }} className={classes.container}>
         {backButton}
         <Flex direction={{ base: 'column-reverse', md: 'column' }}>
            <CustomerForm
               submitForm={handleCreateInvoice}
               customerType={customerType}
               setCustomerType={setCustomerType}
               disabledSaveButton={items.length === 0}
            />

            <Flex
               direction={{ base: 'column', md: 'row' }}
               align={{ base: 'center', md: 'normal' }}
               gap="xl"
               p="xl"
               w="100%"
            >
               <InvoiceForm
                  addRow={handleAddRow}
                  isEditing={isEditing}
                  customerType={customerType}
                  item={selectedItem}
                  loading={false}
                  updateRow={handleUpdateRow}
                  newId={items.length > 0 ? items[items.length - 1].no + 1 : 1}
                  cancelUpdate={cancelUpdate}
               />
               <PosTable
                  data={items}
                  loading={false}
                  title="Items"
                  customerType={customerType}
                  updateRow={handleSelectItem}
                  deleteRow={handleDeleteItem}
                  excludeFields={['itemId', 'retailPrice', 'wholesalesPrice']}
               />
            </Flex>
         </Flex>
      </Box>
   )
}

export default AddInvoice
