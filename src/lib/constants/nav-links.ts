import {
   IconBuildingWarehouse,
   IconChartBar,
   IconChartHistogram,
   IconCreditCard,
   IconHeadphones,
   IconPackages,
   IconReportAnalytics,
   IconSend,
   IconTag,
   IconUsers,
} from '@tabler/icons-react'
import { NavItemType } from './../../types/global'

export const ADMIN_NAV_LINKS: NavItemType[] = [
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
         { label: 'Van Sales Transfers', url: '/vansales/transfers' },
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
      label: `Van Sale's Stocks`,
      icon: IconPackages,
      links: [
         { label: 'Closing Stocks', url: '/vansales/closing-stocks' },
         { label: 'Transfer Records', url: '/vansales/transfer-records' },
         { label: 'Invoice Records', url: '/vansales/invoice-records' },
      ],
   },

   {
      label: `Customer's Stocks`,
      icon: IconUsers,
      links: [
         { label: 'Closing Stocks', url: '/customer/closing-stocks' },
         { label: 'In Records', url: '/customer/in-records' },
         { label: 'Out Records', url: '/customer/out-records' },
      ],
   },

   { label: 'Users', icon: IconHeadphones, url: '/users' },
   { label: 'Expenses', icon: IconChartBar, url: '/expenses' },
   { label: 'Summary', icon: IconReportAnalytics, url: '/summary' },
   {
      label: `Warehouse's Stocks`,
      icon: IconBuildingWarehouse,
      links: [
         { label: 'Closing Stocks', url: '/warehouse/closing-stocks' },
         { label: 'Supply Records', url: '/warehouse/supply-records' },
         { label: 'Transfer Records', url: '/warehouse/transfer-records' },
         { label: 'Invoice Records', url: '/warehouse/invoice-records' },
      ],
   },
]

export const SALES_ADMIN_NAV_LINKS: NavItemType[] = [
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
         { label: 'Van Sales Transfers', url: '/vansales/transfers' },
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
      label: `Van Sale's Stocks`,
      icon: IconPackages,
      links: [
         { label: 'Closing Stocks', url: '/vansales/closing-stocks' },
         { label: 'Transfer Records', url: '/vansales/transfer-records' },
         { label: 'Invoice Records', url: '/vansales/invoice-records' },
      ],
   },

   {
      label: `Customer's Stocks`,
      icon: IconUsers,
      links: [
         { label: 'Closing Stocks', url: '/customer/closing-stocks' },
         { label: 'In Records', url: '/customer/in-records' },
         { label: 'Out Records', url: '/customer/out-records' },
      ],
   },

   {
      label: `Warehouse's Stocks`,
      icon: IconBuildingWarehouse,
      links: [
         { label: 'Closing Stocks', url: '/warehouse/closing-stocks' },
         { label: 'Supply Records', url: '/warehouse/supply-records' },
         { label: 'Transfer Records', url: '/warehouse/transfer-records' },
         { label: 'Invoice Records', url: '/warehouse/invoice-records' },
      ],
   },
]

export const VAN_SALES_NAV_LINKS: NavItemType[] = [
   {
      label: 'Sales',
      icon: IconChartHistogram,
      links: [
         { label: 'Invoices', url: '/' },
         { label: 'Customers', url: '/customers' },
      ],
   },

   {
      label: 'Products',
      icon: IconTag,
      links: [{ label: 'Categories', url: '/categories' }],
   },
   {
      label: `Van Sale's Stocks`,
      icon: IconPackages,
      links: [
         { label: 'Closing Stocks', url: '/vansales/closing-stocks' },
         { label: 'Transfer Records', url: '/vansales/transfer-records' },
         { label: 'Invoice Records', url: '/vansales/invoice-records' },
      ],
   },
]
