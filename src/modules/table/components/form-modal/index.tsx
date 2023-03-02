import { Button, Flex, NumberInput, Select, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { Item } from '../pos-table'
import useStyles from './styles'

interface Props {
   forms: {
      [key: string]: {
         title?: string
         value: string | number | Date | { label: string; value: string }[]
         addRequired: boolean
         updateRequired: boolean
      }
   }
   item: Item | null
   isEditing: boolean
   loading: boolean
   updateRow: <T extends { [key: string]: unknown }>(values: T) => void
   addRow: <T extends { [key: string]: unknown }>(values: T) => void
}

const FormModal: React.FC<Props> = ({ forms, item, isEditing, loading, updateRow, addRow }) => {
   const { classes } = useStyles()

   // {
   //    title: '',
   //    value: '' | {label: '', value: ''}
   // }
   const mappedValues = Object.entries(forms).map(([k, v]) => {
      if (isEditing) {
         const value = item?.[k]
         if (typeof value === 'object' && 'isBadge' in value) {
            return { [k]: value.value }
         }

         return { [k]: item?.[k] }
      }
      if (typeof v.value === 'string' || typeof v.value === 'object') {
         return { [k]: '' }
      }
      if (typeof v.value === 'number') {
         return { [k]: 0 }
      }
      if (v.value === null) return { [k]: null }
   })

   const mappedAddValidators = Object.entries(forms).map(([k, v]) => {
      if (v.addRequired) {
         return { [k]: isNotEmpty('Please fill the form') }
      }
   })

   const mappedUpdateValidators = Object.entries(forms).map(([k, v]) => {
      if (v.updateRequired) {
         return { [k]: isNotEmpty('Please fill the form') }
      }
   })

   const initialValues = Object.assign({}, ...mappedValues)

   const addValidate = Object.assign({}, ...mappedAddValidators)
   const updateValidate = Object.assign({}, ...mappedUpdateValidators)

   const form = useForm({
      initialValues,
      ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   function handleSubmit<T extends { [key: string]: unknown }>(values: T) {
      isEditing ? updateRow({ ...item, ...values }) : addRow({ ...values })
   }

   const inputs = Object.entries(forms).map(([k, v]) => {
      switch (typeof v.value) {
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
            if (Array.isArray(v.value)) {
               return (
                  <Select
                     key={k}
                     label={v.title}
                     data={v.value}
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
