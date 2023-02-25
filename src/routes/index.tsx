import { createBrowserRouter } from 'react-router-dom'
import CategoriesTable from '../modules/table/components/category-table'
import CustomersTable from '../modules/table/components/customer-table'
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
      ],
   },
])
