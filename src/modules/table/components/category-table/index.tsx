import useSWR from 'swr'
import { getAllCategories, GetAllCategoriesResponse } from '../../../../api/category/queries/getAllCategories'
import PosTable from '../pos-table'
import type { GetAllCategoriesData } from '../../../../api/category/queries/getAllCategories'

export type CategoryActionFormType = Partial<NonNullable<GetAllCategoriesData>[0]>

const CategoriesTable: React.FC = () => {
   const { data, isLoading } = useSWR<GetAllCategoriesResponse>('/category/all', getAllCategories)

   const forms: CategoryActionFormType = { name: '' }

   return <PosTable data={data?.data} loading={isLoading} title="Categories" forms={forms} action />
}

export default CategoriesTable
