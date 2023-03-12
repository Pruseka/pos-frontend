import { Box, Flex, Text } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { NavLink, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { getSupplyById, GetSupplyResponse } from '../../../../../api/supply/queries/getSupplyById'
import useStyles from './styles'
import SupplierForm from './supplier-form'
import PosTable from './table'

const ViewSupply: React.FC = () => {
   const { classes } = useStyles()
   const { supplyId } = useParams()
   const { data, isLoading } = useSWR<GetSupplyResponse>(['/supply', supplyId], ([url, supplyId]: string[]) =>
      getSupplyById(url, supplyId)
   )

   const backButton = (
      <Box pl="xl">
         <NavLink to="/supplies" className={classes.backLink}>
            <Text>
               <Flex align="center" gap="xs">
                  <IconArrowNarrowLeft size={14} />
                  Back to all supplies
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
            <SupplierForm supplier={data.data.supplier} type={data.data.type} />

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
                  title="Supplies"
                  excludeFields={['itemId', 'retailPrice', 'wholesalesPrice']}
               />
            </Flex>
         </Flex>
      </Box>
   )
}

export default ViewSupply
