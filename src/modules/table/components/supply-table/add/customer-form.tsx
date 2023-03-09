import { Autocomplete, Box, Button, Flex, Select } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useEffect } from 'react'
import useSWR from 'swr'
import {
   CustomerType,
   getAllCustomers,
   GetAllCustomersResponse,
} from '../../../../../api/customer/queries/getAllCustomers'
import { PaymentType } from '../../../../../api/invoice/queries/getInvoicesByDate'
import {
   getAllSuppliers,
   GetAllSuppliersData,
   GetAllSuppliersResponse,
} from '../../../../../api/supplier/queries/getAllSuppliers'
import { SupplyType } from '../../../../../api/supply/mutations/provideSupply'
import useStyles from './styles'

export interface FormValues {
   supplier: string
   type: SupplyType
}

interface Props {
   submitForm: (values: FormValues) => Promise<void>
}

const CustomerForm: React.FC<Props> = ({ submitForm }) => {
   const { classes } = useStyles()
   const { data: suppliersData } = useSWR<GetAllSuppliersResponse>('/supplier/all', getAllSuppliers)
   const customers =
      suppliersData?.data && suppliersData.data.length > 0
         ? suppliersData?.data.map((supplier) => ({ label: supplier.name, value: supplier.name }))
         : []

   const paymentTypes = Object.values(SupplyType).map((type) => ({ label: type, value: type }))

   const initialValues = {
      supplier: '',
      type: SupplyType.CASH,
   }

   const form = useForm({
      initialValues,
      validate: {
         supplier: isNotEmpty('Customer Name must be filled'),
      },
      //   ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   const handleSubmit = async (values: FormValues) => {
      await submitForm(values)
   }

   return (
      <Box w="100%">
         <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
            <Flex p="xl" direction={{ base: 'column', md: 'row' }}>
               <Flex justify="center" align="center" sx={{ flex: 1 / 2 }}>
                  <Flex direction="column" gap={{ base: 'sm' }} py="md" w="100%">
                     <Autocomplete
                        label="Supplier Name"
                        py="xs"
                        sx={{ flex: 1 }}
                        classNames={{ label: classes.label }}
                        data={customers}
                        {...form.getInputProps('supplier')}
                     />
                     <Flex gap="sm">
                        <Select
                           label="Payment Type"
                           data={paymentTypes}
                           py="xs"
                           sx={{ flex: 1 }}
                           classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                           {...form.getInputProps('type')}
                        />
                     </Flex>
                  </Flex>
               </Flex>
               <Flex py="md" sx={{ flex: 1 }} justify="flex-end" align="flex-end">
                  <Flex gap="md">
                     <Button variant="outline" className={classes.actionButton}>
                        Discard
                     </Button>
                     <Button className={classes.actionButton} type="submit">
                        Save
                     </Button>
                  </Flex>
               </Flex>
            </Flex>
         </form>
      </Box>
   )
}

export default CustomerForm
