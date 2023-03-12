import { Autocomplete, Box, Button, Flex, Select, Text, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { openConfirmModal } from '@mantine/modals'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import {
   CustomerType,
   getAllCustomers,
   GetAllCustomersResponse,
} from '../../../../../api/customer/queries/getAllCustomers'
import { PaymentType } from '../../../../../api/invoice/queries/getInvoicesByDate'
import useStyles from './styles'

interface Props {
   customer: string
   customerType: CustomerType
   type: PaymentType
}

const CustomerForm: React.FC<Props> = ({ customerType, type }) => {
   const { classes } = useStyles()
   const navigate = useNavigate()

   return (
      <Box w="100%">
            <Flex p="xl" direction={{ base: 'column', md: 'row' }}>
               <Flex justify="center" align="center" sx={{ flex: 1 / 2 }}>
                  <Flex direction="column" gap={{ base: 'sm' }} py="md" w="100%">
                     <Autocomplete
                        label="Customer Name"
                        py="xs"
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label }}
                        data={customers}
                        {...form.getInputProps('customer')}
                     />
                     <Flex gap="sm">
                        <TextInput
                           label="Customer Type"
                           value={customerType}
                           py="xs"
                           sx={{ flex: 1 }}
                           classNames={{ label: classes.label, }}
                        />
                        <TextInput
                           label="Payment Type"
                           value={type}
                           py="xs"
                           sx={{ flex: 1 }}
                           classNames={{ label: classes.label, }
                        />
                     </Flex>
                  </Flex>
               </Flex>
               
      </Box>
   )
}

export default CustomerForm
