import { Box, Flex, TextInput } from '@mantine/core'
import { SupplyType } from '../../../../../api/supply/queries/getSupplyByDate'
import useStyles from './styles'

interface Props {
   supplier: string
   type: SupplyType
}

const SupplierForm: React.FC<Props> = ({ type, supplier }) => {
   const { classes } = useStyles()

   return (
      <Box w="100%">
         <Flex p="xl" direction={{ base: 'column', md: 'row' }}>
            <Flex direction="column" gap={{ base: 'sm' }} py="md" w="100%" maw={500}>
               <TextInput
                  label="Supplier Name"
                  value={supplier}
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
      </Box>
   )
}

export default SupplierForm
