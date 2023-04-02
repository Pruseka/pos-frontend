import { Box, Divider, Flex, Paper, Text } from '@mantine/core'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates'
import { GetSummaryData } from '../../../../api/summary/queries/getSummary'
import useStyles from './styles'

interface Props {
   data: GetSummaryData
   dateValue: DateRangePickerValue
   setDate: React.Dispatch<React.SetStateAction<DateRangePickerValue>>
   title: string
}

const Table: React.FC<Props> = ({ data, dateValue, title, setDate }) => {
   const { classes } = useStyles()

   return (
      <Box p={{ base: 'sm', sm: 'xl' }}>
         <Box py={{ base: 'xs', xs: 'md' }}>
            <Text fw="bold" fz="xl" className={classes.title}>
               {title}
            </Text>
            <Flex p="md" direction={{ base: 'column', xl: 'row' }} gap={{ md: 'sm', base: 'md' }}>
               <DateRangePicker
                  placeholder="Pick dates range"
                  value={dateValue}
                  maxDate={new Date()}
                  sx={{ flex: 1, maxWidth: 300 }}
                  onChange={setDate}
                  size="md"
               />
            </Flex>
            <Box p="md">
               <Paper className={classes.card} my="xl">
                  <Flex justify="space-between" py="sm">
                     <Text>Cash In</Text>
                     <Text>{`${data.cashIn} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text>Cash Out</Text>
                     <Text>{`${data.cashOut} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text>Exepnse Amount</Text>
                     <Text>{`${data.expenseAmount} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text fw="bold">Balance</Text>
                     <Text fw="bold">{`CI - CO - EA = ${data.balance} Ks`}</Text>
                  </Flex>
               </Paper>

               <Paper className={classes.card} my="xl">
                  <Flex justify="space-between" py="sm">
                     <Text>Opening Balance</Text>
                     <Text>{`${data.openingBalance} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text>Closing Balance</Text>
                     <Text>{`${data.closingBalance} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text>Purchasing Amount</Text>
                     <Text>{`${data.purchasingAmount} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text>Selling Amount</Text>
                     <Text>{`${data.sellingAmount} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text>Expense Amount</Text>
                     <Text>{`${data.expenseAmount} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text fw="bold">COGS</Text>
                     <Text fw="bold">{`OB + PA - CB = ${data.cogs} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text fw="bold">Gross Profit</Text>
                     <Text fw="bold">{`SA - COGS = ${data.grossProfit} Ks`}</Text>
                  </Flex>
                  <Divider pb="sm" />

                  <Flex justify="space-between" py="sm">
                     <Text fw="bold">Net Profit</Text>
                     <Text fw="bold">{`GP - EA = ${data.netProfit} Ks`}</Text>
                  </Flex>
               </Paper>
            </Box>
         </Box>
      </Box>
   )
}

export default Table
