import { Icon } from '@tabler/icons-react'

export type NavItemType = {
   icon: Icon
   label: string
   url?: string
   links?: { label: string; url: string }[]
}
