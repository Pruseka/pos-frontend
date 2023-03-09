import { createBrowserRouter } from 'react-router-dom'
import CategoriesTable from '../modules/table/components/category-table'
import CustomersTable from '../modules/table/components/customer-table'
import InvoiceTable from '../modules/table/components/invoice-table'
import AddInvoice from '../modules/table/components/invoice-table/add'
import ItemsTable from '../modules/table/components/item-table'
import SalesmanClosingStocksTable from '../modules/table/components/salesman-table/closing-stocks'
import SuppliersTable from '../modules/table/components/supplier-table'
import AddSupply from '../modules/table/components/supply-table/add'
import ErrorPage from '../pages/error'
import Layout from '../pages/layout'
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
         {
            path: '/',
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
               { index: true, element: <InvoiceTable /> },
               { path: '/customers', element: <CustomersTable /> },
               { path: '/suppliers', element: <SuppliersTable /> },
               { path: '/categories', element: <CategoriesTable /> },
               { path: '/items', element: <ItemsTable /> },

               { path: '/salesman/closing-stocks', element: <SalesmanClosingStocksTable /> },
            ],
         },
         {
            path: '/invoices/add',
            element: <AddInvoice />,
         },
         {
            path: '/supplies/add',
            element: <AddSupply />,
         },
      ],
   },
])
