import { NavItemType } from './../../types/global'
import {
   IconNotes,
   IconCalendarStats,
   IconGauge,
   IconPresentationAnalytics,
   IconFileAnalytics,
   IconAdjustments,
   IconLock,
} from '@tabler/icons-react'

export const NAV_LINKS: NavItemType[] = [
   { label: 'Dashboard', icon: IconGauge, url: '/' },
   {
      label: 'Market news',
      icon: IconNotes,
      links: [
         { label: 'Overview', url: '/hello' },
         { label: 'Forecasts', url: '/' },
         { label: 'Outlook', url: '/' },
         { label: 'Real time', url: '/' },
      ],
   },
   {
      label: 'Releases',
      icon: IconCalendarStats,
      links: [
         { label: 'Upcoming releases', url: '/upcoming-releases' },
         { label: 'Previous releases', url: '/' },
         { label: 'Releases schedule', url: '/' },
      ],
   },
   { label: 'Analytics', icon: IconPresentationAnalytics, url: '/analytics' },
   { label: 'Contracts', icon: IconFileAnalytics, url: '/contracts' },
   { label: 'Settings', icon: IconAdjustments, url: '/settings' },
   {
      label: 'Security',
      icon: IconLock,
      links: [
         { label: 'Enable 2FA', url: '/' },
         { label: 'Change password', url: '/' },
         { label: 'Recovery codes', url: '/' },
      ],
   },
]
