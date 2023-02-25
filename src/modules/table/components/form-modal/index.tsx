import { Button, Flex, NumberInput, Select, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { Item } from '../pos-table'
import useStyles from './styles'

interface Props {
   forms: {
      [key: string]: string | number | Date | { title: string; values: { label: string; value: string }[] }
   }
   item: Item | null
   isEditing: boolean
   loading: boolean
   updateRow: <T extends { [key: string]: unknown }>(values: T) => void
   addRow: <T extends { [key: string]: unknown }>(values: T) => void
}

const FormModal: React.FC<Props> = ({ forms, item, isEditing, updateRow, addRow, loading }) => {
   const { classes } = useStyles()

   const mappedValues = Object.entries(forms).map(([k, v]) => {
      if (isEditing) {
         const value = item?.[k]
         if (typeof value === 'object' && 'isBadge' in value) {
            return { [k]: value.value }
         }
         return { [k]: item?.[k] }
      }
      if (typeof v === 'string' || typeof v === 'object') {
         return { [k]: '' }
      }
      if (typeof v === 'number') {
         return { [k]: 0 }
      }
      if (v === '') return { [k]: null }
   })

   const mappedValidators = Object.entries(forms).map(([k]) => {
      return { [k]: isNotEmpty('Please fill the form') }
   })

   const initialValues = Object.assign({}, ...mappedValues)

   const validate = Object.assign({}, ...mappedValidators)

   const form = useForm({
      initialValues,
      ...(isEditing ? {} : { validate }),
   })

   function handleSubmit<T extends { [key: string]: unknown }>(values: T) {
      console.log(values)
      isEditing ? updateRow({ ...item, ...values }) : addRow({ ...values })
   }

   const inputs = Object.entries(forms).map(([k, v]) => {
      switch (typeof v) {
         case 'string':
            return (
               <TextInput
                  key={k}
                  label={k}
                  py="xs"
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
                  py="xs"
                  classNames={{ label: classes.label }}
                  {...form.getInputProps(k)}
               />
            )
         case 'object':
            if ('title' in v) {
               return (
                  <Select
                     key={k}
                     label={v.title}
                     data={v.values}
                     py="xs"
                     classNames={{ label: classes.label, item: classes.label, input: classes.label }}
                     {...form.getInputProps(k, { type: 'input' })}
                  />
               )
            }
      }
   })

   return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
         <Flex direction="column" gap={{ base: 'sm' }} py="md">
            {inputs}
         </Flex>
         <Button type="submit" loading={loading} className={classes.submitButton}>
            Submit
         </Button>
      </form>
   )
}

export default FormModal
