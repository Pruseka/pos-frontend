import { Button, Flex, Select, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { GetAllCategoriesResponse } from '../../../../api/category/queries/getAllCategories'
import useStyles from './styles'
import { Item } from './table'

interface FormValues {
   name: string
   code: string
   category: string
}

interface Props {
   item: Item | null
   categoriesData: GetAllCategoriesResponse | undefined
   isEditing: boolean
   loading: boolean
   updateRow: <T extends { [key: string]: unknown }>(values: T) => void
   addRow: <T extends { [key: string]: unknown }>(values: T) => void
}

const FormModal: React.FC<Props> = ({ item, isEditing, loading, updateRow, addRow, categoriesData }) => {
   const { classes } = useStyles()

   const categories =
      categoriesData?.data && categoriesData.data.length > 0
         ? categoriesData?.data.map((category) => ({ label: category.name, value: category.categoryId }))
         : []

   const category = categories.find((category) => category.label === item?.category)

   const initialValues =
      isEditing && item
         ? {
              code: item.code!,
              name: item.name!,
              /**
               * @category
               * means categoryId
               */
              category: category?.value as string,
           }
         : {
              code: '',
              name: '',
              category: '',
           }
   console.log(initialValues)
   const addValidate = {
      code: isNotEmpty('Code must be filled'),
      name: isNotEmpty('Name must be filled'),
      category: isNotEmpty('Category must be filled'),
   }
   const updateValidate = {}

   const form = useForm<FormValues>({
      initialValues,
      ...(isEditing ? { validate: updateValidate } : { validate: addValidate }),
   })

   function handleSubmit(values: FormValues) {
      isEditing
         ? updateRow({
              itemId: item?.itemId,
              categoryId: values.category,
              code: values.code,
              name: values.name,
           })
         : addRow({ categoryId: values.category, code: values.code, name: values.name })
   }

   return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
         <Flex direction="column" gap={{ base: 'sm' }} py="md">
            <TextInput
               label="Code"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('code')}
            />
            <TextInput
               label="Name"
               py="xs"
               classNames={{ label: classes.label }}
               {...form.getInputProps('name')}
            />

            <Select
               label="Category"
               data={categories}
               py="xs"
               classNames={{ label: classes.label, item: classes.label, input: classes.label }}
               {...form.getInputProps('category')}
            />
         </Flex>
         <Button type="submit" loading={loading} className={classes.submitButton}>
            Submit
         </Button>
      </form>
   )
}

export default FormModal

// const inputs = Object.entries(forms).map(([k, v]) => {
//     switch (typeof v.value) {
//        case 'string':
//           return (
//              <TextInput
//                 key={k}
//                 label={k}
//                 py="xs"
//                 classNames={{ label: classes.label }}
//                 {...form.getInputProps(k)}
//              />
//           )
//        case 'number':
//           return (
//              <NumberInput
//                 key={k}
//                 label={k}
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 min={10}
//                 max={100}
//                 py="xs"
//                 classNames={{ label: classes.label }}
//                 {...form.getInputProps(k)}
//              />
//           )
//        case 'object':
//           if (Array.isArray(v.value)) {
//              return (
//                 <Select
//                    key={k}
//                    label={v.title}
//                    data={v.value}
//                    py="xs"
//                    classNames={{ label: classes.label, item: classes.label, input: classes.label }}
//                    {...form.getInputProps(k, { type: 'input' })}
//                 />
//              )
//           }
//     }
//  })
