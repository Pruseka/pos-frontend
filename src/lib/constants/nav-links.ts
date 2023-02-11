import {
   IconNotes,
   IconCalendarStats,
   IconGauge,
   IconPresentationAnalytics,
   IconFileAnalytics,
   IconAdjustments,
   IconLock,
} from '@tabler/icons-react'

export const NAV_LINKS = [
   { label: 'Dashboard', icon: IconGauge },
   {
      label: 'Market news',
      icon: IconNotes,
      links: [
         { label: 'Overview', link: '/' },
         { label: 'Forecasts', link: '/' },
         { label: 'Outlook', link: '/' },
         { label: 'Real time', link: '/' },
      ],
   },
   {
      label: 'Releases',
      icon: IconCalendarStats,
      links: [
         { label: 'Upcoming releases', link: '/' },
         { label: 'Previous releases', link: '/' },
         { label: 'Releases schedule', link: '/' },
      ],
   },
   { label: 'Analytics', icon: IconPresentationAnalytics },
   { label: 'Contracts', icon: IconFileAnalytics },
   { label: 'Settings', icon: IconAdjustments },
   {
      label: 'Security',
      icon: IconLock,
      links: [
         { label: 'Enable 2FA', link: '/' },
         { label: 'Change password', link: '/' },
         { label: 'Recovery codes', link: '/' },
      ],
   },
]
