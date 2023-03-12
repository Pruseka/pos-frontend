import useSWR from 'swr'
import { Box, Flex, Text } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { CustomerType } from '../../../../../api/customer/queries/getAllCustomers'
import { Item } from '../../../../../api/invoice/queries/getInvoiceById'
import { getInvoiceById, GetInvoiceResponse } from '../../../../../api/invoice/queries/getInvoiceById'
import CustomerForm from './customer-form'
import useStyles from './styles'
import PosTable from './table'

const AddInvoice: React.FC = () => {
   const { classes } = useStyles()
   const [items, setItems] = useState<Item[]>([])
   const { invoiceId } = useParams()
   const { data, isLoading } = useSWR<GetInvoiceResponse>(
      ['/invoice', invoiceId],
      ([url, invoiceId]: string[]) => getInvoiceById(url, invoiceId)
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

   useHotkeys([
      ['ctrl+Enter', () => console.log('saved')],
      ['alt+D', () => console.log('discard')],
   ])

   if (!data?.data || isLoading) {
      return <h1>Loading</h1>
   }

   return (
      <Box p={{ base: 'xs', md: 'xl' }} className={classes.container}>
         {backButton}
         <Flex direction={{ base: 'column-reverse', md: 'column' }}>
            <CustomerForm
               customer={data.data.customer}
               customerType={data.data.customerType}
               type={data.data.type}
            />

            <Flex
               direction={{ base: 'column', md: 'row' }}
               align={{ base: 'center', md: 'normal' }}
               gap="xl"
               p="xl"
               w="100%"
            >
               <PosTable
                  data={data?.data.items}
                  loading={false}
                  title="Items"
                  excludeFields={['itemId', 'retailPrice', 'wholesalesPrice']}
               />
            </Flex>
         </Flex>
      </Box>
   )
}

export default AddInvoice
