import { Modal, NumberInput, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

interface Props {
   title: string
   forms: {
      [key: string]: string | number | Date | { value: string; label: string }[]
   }
   opened: boolean
   onClose: () => void
}

const FormModal: React.FC<Props> = ({ title, forms, opened, onClose }) => {
   const mappedValues = Object.entries(forms).map(([k, v]) => {
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

   const inputs = Object.entries(forms).map(([k, v]) => {
      switch (typeof v) {
         case 'string':
            return <TextInput key={k} label={k.toLocaleUpperCase()} {...form.getInputProps(k)} py="md" />
         case 'number':
            return (
               <NumberInput
                  key={k}
                  label={k.toLocaleUpperCase()}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={10}
                  max={100}
                  {...form.getInputProps(k)}
               />
            )
         case 'object':
            if (Array.isArray(v)) {
               return <Select key={k} label={k} data={v} />
            }
      }
   })

   return (
      <Modal title={title} opened={opened} onClose={onClose}>
         <form>{inputs}</form>
      </Modal>
   )
}

export default FormModal
