import { Box, Flex, TextInput } from '@mantine/core'
import { CustomerType } from '../../../../../api/customer/queries/getAllCustomers'
import { PaymentType } from '../../../../../api/invoice/queries/getInvoicesByDate'
import useStyles from './styles'

interface Props {
   customer: string
   customerType: CustomerType
   type: PaymentType
}

const CustomerForm: React.FC<Props> = ({ customerType, type, customer }) => {
   const { classes } = useStyles()

   return (
      <Box w="100%">
         <Flex p="xl" direction={{ base: 'column', md: 'row' }}>
            <Flex direction="column" gap={{ base: 'sm' }} py="md" w="100%" maw={500}>
               <TextInput
                  label="Customer Name"
                  value={customer}
                  py="xs"
                  sx={{ flex: 1 }}
                  disabled
                  classNames={{ label: classes.label }}
               />
               <Flex gap="sm">
                  <TextInput
                     label="Customer Type"
                     value={customerType}
                     py="xs"
                     sx={{ flex: 1 }}
                     disabled
                     classNames={{ label: classes.label }}
                  />
                  <TextInput
                     label="Payment Type"
                     value={type}
                     py="xs"
                     sx={{ flex: 1 }}
                     disabled
                     classNames={{ label: classes.label }}
                  />
               </Flex>
            </Flex>
         </Flex>
      </Box>
   )
}

export default CustomerForm
