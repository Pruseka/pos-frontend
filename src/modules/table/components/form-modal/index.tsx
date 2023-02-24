import { Button, Flex, NumberInput, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Item } from '../pos-table'
import useStyles from './styles'

interface Props {
   forms: {
      [key: string]: string | number | Date | string[]
   }
   item: Item
   isEditing: boolean
   updateRow: <T extends { [key: string]: unknown }>(values: T) => void
}

const FormModal: React.FC<Props> = ({ forms, item, isEditing, updateRow }) => {
   const { classes } = useStyles()

   const mappedValues = Object.entries(forms).map(([k, v]) => {
      if (isEditing) {
         return { [k]: item[k] }
      }
      if (typeof v === 'string' || typeof v === 'object') {
         return { [k]: '' }
      }
      if (typeof v === 'number') {
         return { [k]: 0 }
      }
      if (v === '') return { [k]: null }
   })

   const initialValues = Object.assign({}, ...mappedValues)

   const form = useForm({
      initialValues,
   })

   function handleSubmit<T extends { [key: string]: unknown }>(values: T) {
      updateRow({ ...item, ...values })
   }

   const inputs = Object.entries(forms).map(([k, v]) => {
      switch (typeof v) {
         case 'string':
            return (
               <TextInput
                  key={k}
                  label={k}
                  py="sm"
                  classNames={{ label: classes.label }}
                  {...form.getInputProps(k)}
               />
            )
         case 'number':
            return (
               <NumberInput
                  key={k}
                  label={k}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={10}
                  max={100}
                  py="sm"
                  {...form.getInputProps(k)}
                  classNames={{ label: classes.label }}
               />
            )
         case 'object':
            if (Array.isArray(v)) {
               return <Select key={k} label={k} data={v} py="sm" classNames={{ label: classes.label }} />
            }
      }
   })

   return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
         <Flex direction="column" gap={{ base: 'sm' }} py="md">
            {inputs}
         </Flex>
         <Button type="submit" className={classes.submitButton}>
            Submit
         </Button>
      </form>
   )
}

export default FormModal
