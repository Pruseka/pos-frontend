import { Button, Flex, NumberInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import useStyles from './styles'
import { Item } from './table'

interface FormValues {
   purchasingPrice: number
   retailPrice: number
   wholesalesPrice: number
}

interface Props {
   item: Item
   loading: boolean
   updatePrice: <T extends { [key: string]: unknown }>(values: T) => Promise<void>
}

const PriceFormModal: React.FC<Props> = ({ item, loading, updatePrice }) => {
   const { classes } = useStyles()

   const initialValues = {
      purchasingPrice: item.purchasingPrice || 0,
      retailPrice: item.retailPrice || 0,
      wholesalesPrice: item.wholesalesPrice || 0,
   }

   const form = useForm<FormValues>({
      initialValues,
   })

   function handleSubmit(values: FormValues) {
      //   console.log({ ...item, ...values })
      updatePrice({ ...item, ...values })
   }

   return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
         <Flex direction="column" gap={{ base: 'sm' }} py="md">
            <NumberInput
               label="Purchasing Price"
               py="xs"
               classNames={{ label: classes.label }}
               hideControls
               rightSection={<Text fz="sm">Ks</Text>}
               parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
               formatter={(value: any) =>
                  !Number.isNaN(parseFloat(value))
                     ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                     : ''
               }
               {...form.getInputProps('purchasingPrice')}
            />
            <NumberInput
               label="Retail Price"
               py="xs"
               classNames={{ label: classes.label }}
               hideControls
               rightSection={<Text fz="sm">Ks</Text>}
               parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
               formatter={(value: any) =>
                  !Number.isNaN(parseFloat(value))
                     ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                     : ''
               }
               {...form.getInputProps('retailPrice')}
            />
            <NumberInput
               label="Wholesales Price"
               py="xs"
               classNames={{ label: classes.label }}
               hideControls
               rightSection={<Text fz="sm">Ks</Text>}
               parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
               formatter={(value: any) =>
                  !Number.isNaN(parseFloat(value))
                     ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                     : ''
               }
               {...form.getInputProps('wholesalesPrice')}
            />
         </Flex>
         <Button type="submit" loading={loading} className={classes.submitButton}>
            Submit
         </Button>
      </form>
   )
}

export default PriceFormModal
