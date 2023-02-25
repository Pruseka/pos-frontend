import { NavItemType } from './../../types/global'
import {
   IconNotes,
   IconCalendarStats,
   IconPresentationAnalytics,
   IconFileAnalytics,
   IconLock,
   IconCategory,
   IconFriends,
} from '@tabler/icons-react'

export const NAV_LINKS: NavItemType[] = [
   { label: 'Customer', icon: IconFriends, url: '/' },
   { label: 'Category', icon: IconCategory, url: '/category' },
   {
      label: 'Market news',
      icon: IconNotes,
      links: [
         { label: 'Overview', url: '/overview' },
         { label: 'Forecasts', url: '/asdff' },
         { label: 'Outlook', url: '/dfdf' },
         { label: 'Real time', url: '/aasdd' },
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
