import { createBrowserRouter } from 'react-router-dom'
import { UsersTable } from '../modules/dashboard/table'
import Root from '../pages/root'

const data = [
   {
      avatar:
         'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Albert',
      job: 'manager',
      email: 'gg@gmail.com',
      phone: '094242424',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'James',
      job: 'designer',
      email: 'gg@gmail.com',
      phone: '094242424',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Ryan',
      job: 'manager',
      email: 'gg@gmail.com',
      phone: '094242424',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Jake',
      job: 'engineer',
      email: 'gg@gmail.com',
      phone: '094242424',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Alfie',
      job: 'manager',
      email: 'gg@gmail.com',
      phone: '094242424',
   },
   {
      avatar:
         'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      name: 'Lily',
      job: 'designer',
      email: 'gg@gmail.com',
      phone: '094242424',
   },
]

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Root />,
      children: [{ index: true, element: <UsersTable data={data} /> }],
   },
])
