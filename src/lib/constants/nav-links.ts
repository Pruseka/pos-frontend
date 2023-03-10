import {
   IconCalendarStats,
   IconChartHistogram,
   IconCreditCard,
   IconFileAnalytics,
   IconLock,
   IconPackages,
   IconPresentationAnalytics,
   IconSend,
   IconTag,
   IconUsers,
} from '@tabler/icons-react'
import { NavItemType } from './../../types/global'

export const NAV_LINKS: NavItemType[] = [
   {
      label: 'Sales',
      icon: IconChartHistogram,
      links: [
         { label: 'Invoices', url: '/' },
         { label: 'Customers', url: '/customers' },
      ],
   },
   {
      label: 'Purchases',
      icon: IconCreditCard,
      links: [
         { label: 'Supplies', url: '/supplies' },
         { label: 'Supplier', url: '/suppliers' },
      ],
   },
   {
      label: 'Transfers',
      icon: IconSend,
      links: [
         { label: 'Salesman Transfers', url: '/salesman/transfers' },
         { label: 'Customer Transfers', url: '/customer/transfers' },
      ],
   },
   {
      label: 'Products',
      icon: IconTag,
      links: [
         { label: 'Items', url: '/items' },
         { label: 'Categories', url: '/categories' },
      ],
   },
   {
      label: `Salesman's Stocks`,
      icon: IconPackages,
      links: [
         { label: 'Closing Stocks', url: '/salesman/closing-stocks' },
         { label: 'In Records', url: '/salesman/in-records' },
         { label: 'Out Records', url: '/salesman/out-records' },
      ],
   },

   { label: 'Users', icon: IconUsers, url: '/users' },
]
