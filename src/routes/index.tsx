import { Text } from '@mantine/core'
import { createBrowserRouter } from 'react-router-dom'
import CategoriesTable from '../modules/table/components/category-table'
import CustomersTable from '../modules/table/components/customer-table'
import InvoiceTable from '../modules/table/components/invoice-table'
import ItemsTable from '../modules/table/components/item-table'
import ErrorPage from '../pages/error'
import LoginPage from '../pages/login'
import Root from '../pages/root'

export const router = createBrowserRouter([
   {
      path: '/login',
      element: <LoginPage />,
   },
   {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
         { index: true, element: <CustomersTable /> },
         { path: '/category', element: <CategoriesTable /> },
         { path: '/item', element: <ItemsTable /> },
         { path: '/invoice', element: <InvoiceTable /> },
      ],
   },
   {
      path: '/invoices/:invoiceId',
      element: <ItemsTable />,
      errorElement: <ErrorPage />,
   },
])
