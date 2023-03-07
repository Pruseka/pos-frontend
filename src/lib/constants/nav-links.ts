import {
   IconCalendarStats,
   IconChartHistogram,
   IconCreditCard,
   IconFileAnalytics,
   IconIceCream,
   IconLock,
   IconPresentationAnalytics,
   IconTag,
} from '@tabler/icons-react'
import { NavItemType } from './../../types/global'

export const NAV_LINKS: NavItemType[] = [
   {
      label: 'Sales',
      icon: IconChartHistogram,
      links: [
         { label: 'Invoices', url: '/invoices' },
         { label: 'Customers', url: '/' },
      ],
   },
   {
      label: 'Purchases',
      icon: IconCreditCard,
      links: [
         { label: 'Supplies', url: '/supplies' },
         { label: 'Supplier', url: '/supplier' },
      ],
   },
   { label: 'Item', icon: IconIceCream },
   {
      label: 'Products',
      icon: IconTag,
      links: [
         { label: 'Items', url: '/items' },
         { label: 'Categories', url: '/categories' },
      ],
   },
   {
      label: 'Releases',
      icon: IconCalendarStats,
      links: [
         { label: 'Upcoming releases', url: '/upcoming-releases' },
         { label: 'Previous releases', url: '/ffdsf' },
         { label: 'Releases schedule', url: '/fdgsdgsd' },
      ],
   },
   { label: 'Analytics', icon: IconPresentationAnalytics, url: '/analytics' },
   { label: 'Contracts', icon: IconFileAnalytics, url: '/contracts' },

   {
      label: 'Security',
      icon: IconLock,
      links: [
         { label: 'Enable 2FA', url: '/hhhh' },
         { label: 'Change password', url: '/bbb' },
         { label: 'Recovery codes', url: '/vvv' },
      ],
   },
]
